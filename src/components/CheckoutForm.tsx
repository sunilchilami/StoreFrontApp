import React, { useState } from "react";
import { StoreItemsModel } from "../models/Interfaces/StoreData";
import "../components/styles/CheckoutForm.css";
import usePhoneNumberInput from "../hooks/usePhoneNumberInput";

interface CheckoutFormProps {
  item: StoreItemsModel;
  onSubmit: (order: { item: StoreItemsModel; customerInfo: any }) => void;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  item,
  onSubmit,
  onBack,
}) => {
  const { phoneNumber, handlePhoneNumberChange } = usePhoneNumberInput();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    creditCard: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;

    let errors: { [key: string]: string } = {};
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.email) errors.email = "House Number is required";
    if (!formData.phone) errors.phone = "Phone Number is required";
    if (!formData.creditCard) errors.creditCard = "Credit Card is required";
    if (!formData.address) errors.address = "Address is required";

    if (!formData.fullName.match(/^[A-Za-z\s]+$/)) {
      errors.fullName = "Full Name must be only alphabetical characters";
      isValid = false;
    }
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Invalid Email format";
      isValid = false;
    }
    if (phoneNumber.length < 12) {
      errors.phone = "Phone number must be 10 digit";
      isValid = false;
    }
    if (!formData.creditCard.match(/^\d{19}$/)) {
      errors.creditCard = "Credit Card must be 19 digit and numaric only";
      isValid = false;
    }

    for (const key in formData) {
      if (formData[key as keyof typeof formData].trim() === "") {
        errors[key as keyof typeof formData] = "This field is required";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        item,
        customerInfo: { ...formData, phoneNumber: phoneNumber },
      });
    }
  };

  const resetForm = (e: any) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      address: "",
      email: "",
      phone: "",
      creditCard: "",
    });
  };

  return (
    <div>
      <button className="backBtn" onClick={onBack}>
        Back to Store
      </button>
      <form
        className="checkout-form"
        onSubmit={handleSubmit}
        onReset={resetForm}
      >
        <h2>Checkout Form</h2>
        <hr />
        <div className="item-summery">
          <img src={item.imageUrl} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: {item.actualPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="off"
            required
            maxLength={50}
          />
          {formErrors.fullName && (
            <p className="error-message">{formErrors.fullName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="off"
            required
            maxLength={300}
          />
          {formErrors.address && (
            <p className="error-message">{formErrors.address}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            value={phoneNumber}
            autoComplete="off"
            maxLength={13}
            onChange={(e) => {
              handleChange(e);
              handlePhoneNumberChange(e.target.value);
            }}
            required
          />
          {formErrors.phone && (
            <p className="error-message">{formErrors.phone}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="creditCard">Credit Card</label>
          <input
            type="tel"
            name="creditCard"
            value={formData.creditCard}
            maxLength={19}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {formErrors.creditCard && (
            <p className="error-message">{formErrors.creditCard}</p>
          )}
        </div>
        <div className="btnContainer">
          <button type="submit">Submit Order</button>
          <button type="reset">Reset Order</button>
        </div>
      </form>
    </div>
  );
};
export default CheckoutForm;
