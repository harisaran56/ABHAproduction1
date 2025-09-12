import { useState } from "react";

export default function NewStorage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        abhaNumber: "",
        email: "",
        phoneNumber: "",
        abhaAddress: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted", formData);
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h1>New Storage</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your first name" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your last name" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your ABHA number" 
                        name="abhaNumber" 
                        value={formData.abhaNumber} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your ABHA address" 
                        name="abhaAddress" 
                        value={formData.abhaAddress} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your state" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your zip code" 
                        name="zipCode" 
                        value={formData.zipCode} 
                        onChange={handleChange} 
                    />
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}