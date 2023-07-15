const ContactUs = () => {
    return <div>
        <h1>Contact Us</h1>
        <div className="main-content">
            
        </div>
    </div>
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dropdownValue: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>

        <div>
    <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
        </div>
  

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <select
        name="dropdownValue"
        value={formData.dropdownValue}
        onChange={handleChange}
      >
        <option value="">-- Select an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
