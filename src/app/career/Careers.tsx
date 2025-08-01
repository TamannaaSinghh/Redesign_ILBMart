"use client";
import React, { useState, useEffect } from "react";

const Careers = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      department: "Technology",
      location: "Bangalore",
      type: "Full-time",
      description:
        "Build user interfaces for our grocery delivery platform using React.js.",
    },
    {
      id: 2,
      title: "Supply Chain Manager",
      department: "Operations",
      location: "Delhi",
      type: "Full-time",
      description:
        "Optimize our grocery supply chain to ensure fresh products reach customers quickly.",
    },
    {
      id: 3,
      title: "Customer Support Executive",
      department: "Support",
      location: "Mumbai",
      type: "Part-time",
      description:
        "Help customers with their orders and ensure a smooth shopping experience.",
    },
    {
      id: 4,
      title: "Quality Assurance Specialist",
      department: "Operations",
      location: "Hyderabad",
      type: "Full-time",
      description:
        "Ensure all grocery products meet our quality standards before delivery.",
    },
  ]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    coverLetter: "",
  });

  const [fileName, setFileName] = useState("No file chosen");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      resume: null,
      coverLetter: "",
    });
    setFileName("No file chosen");
  };

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // ... rest of the component code remains the same ...

  useEffect(() => {
    let results = jobs;

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      results = results.filter((job) => job.department === departmentFilter);
    }

    if (locationFilter !== "all") {
      results = results.filter((job) => job.location === locationFilter);
    }

    setFilteredJobs(results);
  }, [searchTerm, departmentFilter, locationFilter, jobs]);

  const departments = [...new Set(jobs.map((job) => job.department))];
  const locations = [...new Set(jobs.map((job) => job.location))];

  return (
    <div className="container text-green-600 mx-auto px-4 py-8">
      {/* Hero Section */}
      <section
        className="text-center mb-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          padding: " 60px 20px",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Join Our Grocery Revolution</h1>
        <p className="text-lg mb-6">
          Be part of a team that's making fresh groceries accessible to
          everyone.
        </p>
        <button
          className="bg-green-600 text-white px-6 py-2 w-5xl
 rounded-lg hover:bg-green-500 transition"
        >
          View Open Positions
        </button>
        <div className="flex justify-center ">
          <img
            src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Team"
            className="mt-8 rounded-lg max-h-[390px] mb-[30px]  object-cover"
          />
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="all">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Resume Upload */}
      <div className="mb-12">
        <div className="border border-dashed border-gray-400 p-6 rounded text-center text-gray-600">
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Upload Your Resume
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="fullName"
                  className="block text-start font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-start font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="block text-start font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Position */}
              <div className="space-y-1">
                <label
                  htmlFor="position"
                  className="block text-start font-medium text-gray-700"
                >
                  Position Applying For
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-1">
                <label
                  htmlFor="resume"
                  className="block text-start font-medium text-gray-700"
                >
                  Upload Resume (PDF or DOCX)
                </label>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="resume"
                    className="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-colors"
                  >
                    Choose File
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm text-gray-600">{fileName}</span>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-1">
                <label
                  htmlFor="coverLetter"
                  className="block text-start font-medium text-gray-700"
                >
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="4"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Current Openings ({filteredJobs.length})
        </h2>
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No jobs match your search criteria.
          </p>
        )}
      </section>

      {/* Culture Section */}
      <CultureSection />
    </div>
  );
};

const JobCard = ({ job }) => (
  <div className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
    <div className="text-sm text-gray-600 space-y-1 mb-3">
      <div> {job.department}</div>
      <div> {job.location}</div>
      <div> {job.type}</div>
    </div>
    <p className="text-gray-700 mb-4">{job.description}</p>
    <button className="bg-light-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
      Apply Now
    </button>
  </div>
);

const CultureSection = () => {
  const culturePoints = [
    {
      icon: "🍃",
      title: "Fresh Thinking",
      description:
        "We value innovative ideas that help deliver fresher groceries faster.",
    },
    {
      icon: "❤️",
      title: "Customer Love",
      description: "Our customers are at the heart of everything we do.",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description:
        "We move quickly to get groceries to customers when they need them.",
    },
  ];

  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-6">Our Culture</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {culturePoints.map((point, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{point.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
            <p className="text-gray-600">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Careers;
