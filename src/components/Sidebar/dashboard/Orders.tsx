import { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
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
import {
  Search,
  Download,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import "./Orders.css";
import { apiRequestGet } from "@/lib/ApiService";
import config from "@/config/config";

const BASE_URL = config.BASE_URL;

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

type OrderItem = {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
};

type DeliveryAddress = {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
};

type Order = {
  id: string;
  createdAt: string;
  total: number;
  status: keyof typeof statusColors;
  paymentMethod: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewedOrderId, setViewedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiRequestGet("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // View order details
  const viewedOrder = viewedOrderId
    ? orders.find((order) => order.id === viewedOrderId)
    : null;

  return (
    <>
      <div className="orders-root">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>View and manage your past orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="orders-searchfilter">
              {/* Search and filters */}
              <div className="orders-searchfilter-row">
                <div className="orders-searchfilter-search">
                  <Search className="orders-searchfilter-searchicon" />
                  <Input
                    placeholder="Search orders by ID or item"
                    className="orders-searchfilter-searchinput"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="orders-searchfilter-status">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="orders-searchfilter-selecttrigger">
                      <Filter className="orders-searchfilter-filtericon" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Orders table */}
            <div className="orders-table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="orders-table-actions">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="orders-table-orderid">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div className="orders-table-date">
                          <Calendar className="orders-table-dateicon" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[order.status]}
                        >
                          <span className="orders-table-status">
                            {order.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="orders-table-actions-cell">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setViewedOrderId(order.id)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="orders-dialog-content">
                            <DialogHeader>
                              <DialogTitle>
                                Order Details: {order.id}
                              </DialogTitle>
                              <DialogDescription>
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="orders-dialog-summary">
                              {/* Order summary */}
                              <div className="orders-dialog-summary-grid">
                                <div>
                                  <h3 className="orders-dialog-summary-title">
                                    Delivery Address
                                  </h3>
                                  <div className="orders-dialog-summary-address">
                                    <p>{order.deliveryAddress.name}</p>
                                    <p>{order.deliveryAddress.addressLine1}</p>
                                    {order.deliveryAddress.addressLine2 && (
                                      <p>
                                        {order.deliveryAddress.addressLine2}
                                      </p>
                                    )}
                                    <p>
                                      {order.deliveryAddress.city},{" "}
                                      {order.deliveryAddress.state}{" "}
                                      {order.deliveryAddress.postalCode}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="orders-dialog-summary-title">
                                    Order Summary
                                  </h3>
                                  <div className="orders-dialog-summary-info">
                                    <div className="orders-dialog-summary-row">
                                      <span>Status:</span>
                                      <Badge
                                        variant="outline"
                                        className={statusColors[order.status]}
                                      >
                                        <span className="orders-table-status">
                                          {order.status}
                                        </span>
                                      </Badge>
                                    </div>
                                    <div className="orders-dialog-summary-row">
                                      <span>Payment Method:</span>
                                      <span>{order.paymentMethod}</span>
                                    </div>
                                    <div className="orders-dialog-summary-row orders-dialog-summary-row-total">
                                      <span>Total:</span>
                                      <span>${order.total.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Order items list */}
                              <div className="orders-dialog-items">
                                <div className="orders-dialog-items-header">
                                  <h3 className="orders-dialog-items-title">
                                    Items ({order.items.length})
                                  </h3>
                                </div>
                                <div className="orders-dialog-items-list">
                                  {order.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="orders-dialog-item-row"
                                    >
                                      <div className="orders-dialog-item-img-wrapper">
                                        <img
                                          src={item.imageUrl || "/assets/images/default-img.png"}
                                          alt={item.name}
                                          className="orders-dialog-item-img"
                                        />
                                      </div>
                                      <div className="orders-dialog-item-info">
                                        <div className="orders-dialog-item-name">
                                          {item.name}
                                        </div>
                                        <div className="orders-dialog-item-qty">
                                          Qty: {item.quantity}
                                        </div>
                                      </div>
                                      <div className="orders-dialog-item-price">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                          2
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">
                                <FileDown className="orders-dialog-downloadicon" />
                                Download Invoice
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          className="orders-table-downloadbtn"
                          title="Download Invoice"
                        >
                          <Download className="orders-table-downloadicon" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {paginatedOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="orders-table-empty">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="orders-pagination">
                <div className="orders-pagination-info">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)}{" "}
                  of {filteredOrders.length} entries
                </div>
                <div className="orders-pagination-controls">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="orders-pagination-button"
                  >
                    <ChevronLeft className="orders-pagination-icon" />
                  </Button>
                  <div className="orders-pagination-numbers">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <Button
                        key={index}
                        variant={
                          currentPage === index + 1 ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(index + 1)}
                        className="orders-pagination-button"
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="orders-pagination-button"
                  >
                    <ChevronRight className="orders-pagination-icon" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Orders;
