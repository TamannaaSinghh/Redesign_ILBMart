// Addresses.tsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Pencil, Trash2, Plus, GripVertical } from "lucide-react";
import "./Addresses.css";
import {
  apiRequestGet,
  apiRequestPost,
  // apiRequestPut, // This is now correctly imported
  apiRequestDelete,
} from "@/lib/ApiService";
import config from "@/config/config";

const BASE_URL = config.BASE_URL;

interface Address {
  id: string;
  userId: string;
  name: string;
  customType?: string;
  houseno: string;
  roadname: string;
  landmark: string;
  area: string;
  postalCode: string;
  isDefault: boolean;
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState<Address>({
    userId: "u1",
    name: "",
    customType: "",
    houseno: "",
    roadname: "",
    landmark: "",
    area: "",
    postalCode: "",
    isDefault: false,
    id: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const response = await apiRequestGet("/user/addresses");
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address: Address) => {
    setFormData({
      ...address,
      customType: address.name === "Other" ? address.name : "",
    });
    setEditingId(address.id);
    setOpenEdit(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiRequestDelete(`/user/addresses/${id}`);
      setAddresses(addresses.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const finalName =
      formData.name === "Other"
        ? formData.customType || "Other"
        : formData.name;
    const updatedData = { ...formData, name: finalName };

    // try {
    //   if (editingId) {
    //     const response = await apiRequestPut(
    //       `/user/addresses/${editingId}`,
    //       updatedData
    //     );
    //     setAddresses((prev) =>
    //       prev.map((addr) => (addr.id === editingId ? response.data : addr))
    //     );
    //   } else {
    //     const response = await apiRequestPost("/user/addresses", updatedData);
    //     setAddresses([...addresses, response.data]);
    //   }

    //   setFormData({
    //     userId: "u1",
    //     name: "",
    //     customType: "",
    //     houseno: "",
    //     roadname: "",
    //     landmark: "",
    //     area: "",
    //     postalCode: "",
    //     isDefault: false,
    //     id: "",
    //   });
    //   setEditingId(null);
    //   setOpenEdit(false);
    // } catch (error) {
    //   console.error("Failed to save address:", error);
    // }
  };

  if (loading) {
    return <div className="loading-container">Loading addresses...</div>;
  }

  return (
    <div className="address-container">
      <div className="address-header">
        <h2>Saved Addresses</h2>
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger asChild>
            <Button
              disabled={addresses.length >= 5}
              className="add-button"
              onClick={() => {
                setFormData({
                  userId: "u1",
                  name: "",
                  customType: "",
                  houseno: "",
                  roadname: "",
                  landmark: "",
                  area: "",
                  postalCode: "",
                  isDefault: false,
                  id: "",
                });
                setEditingId(null);
              }}
            >
              <Plus
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  color: "#47B05A",
                  padding: "2px",
                }}
              />{" "}
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="edit-dialog">
            <DialogHeader>
              <DialogTitle className="dialog-title">
                {editingId ? "Edit Address" : "Add Address"}
              </DialogTitle>
            </DialogHeader>
            <div className="edit-form">
              <div>
                <div className="first-edit-box">
                  <div className="row">
                    <label>Pincode</label>
                    <Input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <label>Location/ Area</label>
                    <Input
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <label>
                    House No./ Flat No./ Building Name/ Apartment{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="houseno"
                    required
                    value={formData.houseno}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label>
                    Road Name, Area, Colony{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="roadname"
                    required
                    value={formData.roadname}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label>
                    Add Nearby / Landmark{" "}
                    <span className="optional">(Optional)</span>
                  </label>
                  <Input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="right-box">
                <div className="row">
                  <label>Type of Address</label>
                  <div className="type-buttons row">
                    {[
                      { label: "Home", icon: "fa-solid fa-house" },
                      { label: "Office", icon: "fa-solid fa-briefcase" },
                      { label: "Hotel", icon: "fa-solid fa-bed" },
                      { label: "Other", icon: "fa-solid fa-location-dot" },
                    ].map((typeObj) => (
                      <button
                        key={typeObj.label}
                        type="button"
                        className={`type-button ${
                          formData.name === typeObj.label ? "active" : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            name: typeObj.label,
                            customType: "",
                          }))
                        }
                      >
                        <i
                          className={typeObj.icon}
                          style={{ marginRight: "6px" }}
                        ></i>
                        {typeObj.label}
                      </button>
                    ))}
                  </div>
                  {formData.name === "Other" && (
                    <div className="row">
                      <Input
                        name="customType"
                        value={formData.customType}
                        placeholder="Enter Address Name"
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                <div className="row checkbox-row">
                  <span className="primary-msg">Set as Primary Address</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={async (e) => {
                        const checked = e.target.checked;
                        setFormData((prev) => ({
                          ...prev,
                          isDefault: checked,
                        }));
                        // if (checked && formData.id) {
                        //   try {
                        //     await apiRequestPut(
                        //       `/user/addresses/${formData.id}/primary`
                        //     );
                        //     fetchAddresses();
                        //   } catch (error) {
                        //     console.error("Failed to set as primary", error);
                        //   }
                        // }
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <Button onClick={handleSubmit} className="submit-btn">
                  {editingId ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="address-table">
        <thead>
          <tr>
            <th></th>
            <th>Type</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((addr) => (
            <tr key={addr.id}>
              <td>
                <GripVertical className="icon" />
              </td>
              <td>
                <div className="type-cell">
                  {addr.name === "Home" ? (
                    <i className="fa-solid fa-house"></i>
                  ) : addr.name === "Office" ? (
                    <i className="fa-solid fa-briefcase"></i>
                  ) : addr.name === "Hotel" ? (
                    <i className="fa-solid fa-bed"></i>
                  ) : (
                    <i className="fa-solid fa-location-dot"></i>
                  )}{" "}
                  {addr.name}
                  {addr.isDefault && (
                    <Badge className="primary-badge">Primary</Badge>
                  )}
                </div>
              </td>
              <td>
                {`${addr.houseno}, ${addr.roadname}${
                  addr.landmark ? `, ${addr.landmark}` : ""
                }, ${addr.area}, ${addr.postalCode}`}
              </td>
              <td className="action-buttons">
                <Button
                  className="edit-button"
                  onClick={() => handleEdit(addr)}
                >
                  <Pencil /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="delete-button">
                      <Trash2 /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="custom-alert">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="alert-title">
                        Delete
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <p className="alert-text">
                      Do you want to delete this address?
                    </p>
                    <AlertDialogFooter className="alert-footer">
                      <AlertDialogCancel className="cancel-btn">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="delete-btn"
                        onClick={() => handleDelete(addr.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addresses.length >= 5 && (
        <div className="message">
          <p className="limit-message">
            You have reached the maximum limit of 5 saved addresses
          </p>
        </div>
      )}
    </div>
  );
};

export default Addresses;
