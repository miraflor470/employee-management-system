import React, { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : [
          {
            id: "EMP001",
            name: "Juan Dela Cruz",
            department: "IT",
            position: "Developer",
          },
          {
            id: "EMP002",
            name: "Maria Santos",
            department: "HR",
            position: "HR Officer",
          },
        ];
  });

  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
    position: "",
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (
      !form.id ||
      !form.name ||
      !form.department ||
      !form.position
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = form;
      setEmployees(updatedEmployees);
      setEditIndex(null);
    } else {
      setEmployees([...employees, form]);
    }

    setForm({
      id: "",
      name: "",
      department: "",
      position: "",
    });
  };

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter(
      (_, i) => i !== index
    );
    setEmployees(updatedEmployees);
  };

  const editEmployee = (index) => {
    setForm(employees[index]);
    setEditIndex(index);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f1f5f9",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "350px",
          }}
        >
          <h2>Employee Management System</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button
            onClick={() => {
              if (
                username === "admin" &&
                password === "1234"
              ) {
                setIsLoggedIn(true);
              } else {
                alert("Invalid Login");
              }
            }}
            style={{
              width: "100%",
              padding: "10px",
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>EMS</h2>

        <p>🏠 Dashboard</p>
        <p>👥 Employees</p>
        <p>🏢 Departments</p>
        <p>⚙️ Settings</p>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f1f5f9",
        }}
      >
        <h1>Employee Management System</h1>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h1>Employee Management System</h1>

  <button
    onClick={() => setIsLoggedIn(false)}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>

        {/* Dashboard Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
            }}
          >
            <h3>Total Employees</h3>
            <h1>{employees.length}</h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
            }}
          >
            <h3>Departments</h3>
            <h1>
              {
                [...new Set(employees.map((e) => e.department))]
                  .length
              }
            </h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
            }}
          >
            <h3>Active Employees</h3>
            <h1>{employees.length}</h1>
          </div>
        </div>

        {/* Add Employee */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h2>Add Employee</h2>

          <input
            placeholder="Employee ID"
            value={form.id}
            onChange={(e) =>
              setForm({ ...form, id: e.target.value })
            }
          />

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value,
              })
            }
            style={{ marginLeft: "10px" }}
          />

          <input
            placeholder="Position"
            value={form.position}
            onChange={(e) =>
              setForm({
                ...form,
                position: e.target.value,
              })
            }
            style={{ marginLeft: "10px" }}
          />

          <button
            onClick={addEmployee}
            style={{
              marginLeft: "10px",
              padding: "8px 15px",
            }}
          >
            {editIndex !== null
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        {/* Table */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h2>Employee List</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>

                  <td>
                    <button
                      onClick={() =>
                        editEmployee(index)
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteEmployee(index)
                      }
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;