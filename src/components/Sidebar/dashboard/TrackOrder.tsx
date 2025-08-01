import { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { mockOrders } from "../../../lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import {
  apiRequestGet,
  apiRequestPost,
  apiRequest,
} from "../../../lib/ApiService";
import config from "../../../config/config";

const BASE_URL = config.BASE_URL;

import {
  Package,
  Search,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import "./TrackOrder.css";

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  processing: <AlertTriangle className="h-4 w-4 text-blue-500" />,
  shipped: <Truck className="h-4 w-4 text-indigo-500" />,
  delivered: <CheckCircle className="h-4 w-4 text-green-500" />,
  cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusSteps = [
  {
    name: "Order Placed",
    status: "pending",
    description: "Your order has been received",
  },
  {
    name: "Processing",
    status: "processing",
    description: "We're preparing your items",
  },
  {
    name: "Shipped",
    status: "shipped",
    description: "Your order is on the way",
  },
  {
    name: "Delivered",
    status: "delivered",
    description: "Enjoy your products!",
  },
];

const TrackOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState(mockOrders); // Initialize with mock data
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequestGet("/user/orders");
      // Uncomment below line when API is ready and matches the expected format
      // setOrders(response.data || mockOrders); // Fallback to mock data if API returns empty

      // For now, we'll keep using mock data
      setOrders(mockOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Using demo data.");
      toast({
        title: "Error",
        description: "Failed to load orders. Showing demo data.",
        variant: "destructive",
      });
      // Keep mock data as fallback
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const activeOrders = orders.filter(
    (order) => order.status !== "delivered" && order.status !== "cancelled"
  );

  const filteredOrders = activeOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="trackorder-root">
      <Card>
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
          <CardDescription>
            Track the status of your current orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="trackorder-searchbar">
            <div className="trackorder-searchbar-inner">
              <Search className="trackorder-searchicon" />
              <Input
                placeholder="Search by order ID or item name"
                className="trackorder-searchinput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {loading ? (
            <div className="trackorder-empty">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="trackorder-empty">
              <AlertTriangle className="trackorder-empty-icon text-amber-500" />
              <h3 className="trackorder-empty-title">Error loading orders</h3>
              <p className="trackorder-empty-desc">{error}</p>
              <Button
                variant="outline"
                className="trackorder-empty-btn"
                onClick={fetchOrders}
              >
                Retry
              </Button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="trackorder-empty">
              <Package className="trackorder-empty-icon" />
              <h3 className="trackorder-empty-title">No active orders</h3>
              <p className="trackorder-empty-desc">
                You don't have any active orders right now.
              </p>
              <Button variant="outline" className="trackorder-empty-btn">
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="trackorder-table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="trackorder-table-actions">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className={
                        order.id === selectedOrder.id
                          ? "trackorder-row-selected"
                          : ""
                      }
                    >
                      <TableCell className="trackorder-table-orderid">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`trackorder-badge ${
                            statusColors[order.status]
                          }`}
                        >
                          {statusIcons[order.status]}
                          <span className="trackorder-badge-status">
                            {order.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="trackorder-table-actions">
                        <Button
                          size="sm"
                          variant={
                            order.id === selectedOrder.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setSelectedOrder(order)}
                          disabled={loading}
                        >
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <Card>
          <CardHeader>
            <CardTitle>Order Tracking: {selectedOrder.id}</CardTitle>
            <CardDescription>
              Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="trackorder-details">
              {/* Order tracking status */}
              <div className="trackorder-status-steps-wrapper">
                {/* Status line */}
                <div className="trackorder-status-line"></div>
                {/* Status steps */}
                <div className="trackorder-status-steps">
                  {statusSteps.map((step, index) => {
                    const isCompleted =
                      (step.status === "pending" &&
                        [
                          "pending",
                          "processing",
                          "shipped",
                          "delivered",
                        ].includes(selectedOrder.status)) ||
                      (step.status === "processing" &&
                        ["processing", "shipped", "delivered"].includes(
                          selectedOrder.status
                        )) ||
                      (step.status === "shipped" &&
                        ["shipped", "delivered"].includes(
                          selectedOrder.status
                        )) ||
                      (step.status === "delivered" &&
                        selectedOrder.status === "delivered");
                    const isCurrent =
                      (step.status === "pending" &&
                        selectedOrder.status === "pending") ||
                      (step.status === "processing" &&
                        selectedOrder.status === "processing") ||
                      (step.status === "shipped" &&
                        selectedOrder.status === "shipped") ||
                      (step.status === "delivered" &&
                        selectedOrder.status === "delivered");
                    return (
                      <div
                        key={step.name}
                        className="trackorder-status-step-row"
                      >
                        <div
                          className={`trackorder-status-step-icon ${
                            isCompleted
                              ? "trackorder-status-step-completed"
                              : isCurrent
                              ? "trackorder-status-step-current"
                              : "trackorder-status-step-inactive"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="trackorder-status-step-checkicon" />
                          ) : isCurrent ? (
                            statusIcons[selectedOrder.status]
                          ) : (
                            <span className="trackorder-status-step-index">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="trackorder-status-step-content">
                          <h3
                            className={`trackorder-status-step-title ${
                              isCompleted
                                ? "trackorder-status-step-title-completed"
                                : isCurrent
                                ? "trackorder-status-step-title-current"
                                : "trackorder-status-step-title-inactive"
                            }`}
                          >
                            {step.name}
                          </h3>
                          <p className="trackorder-status-step-desc">
                            {step.description}
                          </p>
                          {isCurrent && selectedOrder.status === "shipped" && (
                            <p className="trackorder-status-step-estimate">
                              Estimated delivery: May 25, 2025
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Order items */}
              <div className="trackorder-items">
                <h3 className="trackorder-items-title">Order Items</h3>
                <div className="trackorder-items-list">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="trackorder-item-row">
                      <div className="trackorder-item-img-wrapper">
                        <img
                          src={item.imageUrl || "/assets/images/default-img.png"}
                          alt={item.name}
                          className="trackorder-item-img"
                        />
                      </div>
                      <div className="trackorder-item-info">
                        <h4 className="trackorder-item-name">{item.name}</h4>
                        <p className="trackorder-item-qty">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="trackorder-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackOrder;
