import "./ComplaintPage.css";
const Complaint = () => {
  const handleSubmit = (e: any) => {
    return alert("Your response has been submitted successfully. Thank you.");
  };
  return (
    <>
      <div style={{ float: "right", marginRight: "20px", marginTop: "20px" }}>
        <button type="button" className="btn btn-primary btn-sm">
          Small button
        </button>
      </div>
      <div className="complaintPage">
        <h3 style={{ textAlign: "center" }}>Register a Complaint</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              required
              //onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              //onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="phone">
              Contact Number
            </label>
            <input
              name="phone"
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              required
              //onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="description">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows={10}
              placeholder="Enter Description"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Complaint
          </button>
        </form>
      </div>
    </>
  );
};

export default Complaint;
