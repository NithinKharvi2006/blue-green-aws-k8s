import { useEffect, useState } from "react";
import "./App.css";

const BACKEND_URL = "http://localhost:8090";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [databaseStatus, setDatabaseStatus] = useState("Checking...");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    checkBackend();
    checkDatabase();
    loadProducts();

    const interval = setInterval(() => {
      checkBackend();
      checkDatabase();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const checkBackend = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`);

      if (response.ok) {
        setBackendStatus("Operational");
      } else {
        setBackendStatus("Degraded");
      }
    } catch (error) {
      console.error("Backend health check failed:", error);
      setBackendStatus("Offline");
    }

    setLastChecked(new Date());
  };

  const checkDatabase = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/health/database`
      );

      if (!response.ok) {
        setDatabaseStatus("Offline");
        return;
      }

      const data = await response.json();

      if (data.status === "UP") {
        setDatabaseStatus("Operational");
      } else {
        setDatabaseStatus("Offline");
      }
    } catch (error) {
      console.error("Database health check failed:", error);
      setDatabaseStatus("Offline");
    }

    setLastChecked(new Date());
  };

  const loadProducts = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/products`
      );

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Product loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Operational") {
      return "online";
    }

    if (status === "Checking...") {
      return "pending";
    }

    return "offline";
  };

  const getStatusText = (status) => {
    if (status === "Operational") {
      return "Healthy";
    }

    if (status === "Checking...") {
      return "Checking...";
    }

    return "Unavailable";
  };

  const allSystemsHealthy =
    backendStatus === "Operational" &&
    databaseStatus === "Operational";

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">
            BG
          </div>

          <div>
            <h2>DeployFlow</h2>
            <span>Cloud Platform</span>
          </div>
        </div>

        <nav>

          <a className="nav-item active">
            <span>▣</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>◈</span>
            Deployments
          </a>

          <a className="nav-item">
            <span>◉</span>
            Services
          </a>

          <a className="nav-item">
            <span>▤</span>
            Monitoring
          </a>

        </nav>

        <div className="sidebar-bottom">

          <div className="environment">

            <span className="status-dot"></span>

            Production

          </div>

          <small>
            AWS Kubernetes
          </small>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* ================= HEADER ================= */}

        <header className="topbar">

          <div>

            <p className="breadcrumb">
              Infrastructure / Dashboard
            </p>

            <h1>
              Deployment Dashboard
            </h1>

          </div>

          <div className="topbar-right">

            <div className="live-status">

              <span className="pulse"></span>

              Live

            </div>

            <div className="avatar">
              N
            </div>

          </div>

        </header>

        {/* ================= DEPLOYMENT BANNER ================= */}

        <section className="deployment-banner">

          <div className="banner-left">

            <div className="rocket">
              🚀
            </div>

            <div>

              <p className="label">
                CURRENT DEPLOYMENT
              </p>

              <h2>

                Blue Environment

                <span className="version">
                  v1.0.0
                </span>

              </h2>

              <p className="description">
                Production traffic is currently served by
                the Blue environment.
              </p>

            </div>

          </div>

          <div className="deployment-state">

            <span
              className={
                allSystemsHealthy
                  ? "green-dot"
                  : "pending-dot"
              }
            ></span>

            {allSystemsHealthy
              ? "Healthy"
              : "Checking"}

          </div>

        </section>

        {/* ================= METRICS ================= */}

        <section className="metrics">

          {/* Active Environment */}

          <div className="metric-card">

            <div className="metric-icon blue">
              ◆
            </div>

            <div>

              <p>
                Active Environment
              </p>

              <h3>
                BLUE
              </h3>

              <span className="positive">
                ● Serving traffic
              </span>

            </div>

          </div>

          {/* Backend */}

          <div className="metric-card">

            <div className="metric-icon green">
              ✓
            </div>

            <div>

              <p>
                Backend Status
              </p>

              <h3>
                {backendStatus}
              </h3>

              <span
                className={
                  backendStatus === "Operational"
                    ? "positive"
                    : "negative"
                }
              >

                ● {getStatusText(backendStatus)}

              </span>

            </div>

          </div>

          {/* Database */}

          <div className="metric-card">

            <div className="metric-icon purple">
              DB
            </div>

            <div>

              <p>
                Database Status
              </p>

              <h3>
                {databaseStatus}
              </h3>

              <span
                className={
                  databaseStatus === "Operational"
                    ? "positive"
                    : "negative"
                }
              >

                ● {getStatusText(databaseStatus)}

              </span>

            </div>

          </div>

          {/* Platform */}

          <div className="metric-card">

            <div className="metric-icon orange">
              ☁
            </div>

            <div>

              <p>
                Platform
              </p>

              <h3>
                AWS
              </h3>

              <span>
                us-east-1
              </span>

            </div>

          </div>

        </section>

        {/* ================= MAIN GRID ================= */}

        <section className="dashboard-grid">

          {/* ================= PRODUCTS ================= */}

          <div className="panel products-panel">

            <div className="panel-header">

              <div>

                <p className="label">
                  APPLICATION DATA
                </p>

                <h2>
                  Products
                </h2>

              </div>

              <span className="count">
                {products.length} items
              </span>

            </div>

            {loading ? (

              <div className="loading">
                Loading products...
              </div>

            ) : products.length === 0 ? (

              <div className="empty">
                No products available
              </div>

            ) : (

              <div className="products">

                {products.map((product) => (

                  <div
                    className="product-card"
                    key={product.id}
                  >

                    <div className="product-image">

                      {product.name
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div className="product-info">

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        Product ID #{product.id}
                      </p>

                      <strong>
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                    <button>
                      View
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* ================= SYSTEM HEALTH ================= */}

          <div className="panel system-panel">

            <div className="panel-header">

              <div>

                <p className="label">
                  SYSTEM
                </p>

                <h2>
                  Service Health
                </h2>

              </div>

              <span
                className={
                  allSystemsHealthy
                    ? "healthy"
                    : "pending"
                }
              >

                {allSystemsHealthy
                  ? "Healthy"
                  : "Checking"}

              </span>

            </div>

            {/* Backend */}

            <div className="service">

              <div className="service-icon">
                API
              </div>

              <div className="service-info">

                <h3>
                  Spring Boot Backend
                </h3>

                <p>
                  localhost:8090
                </p>

              </div>

              <span
                className={
                  getStatusClass(
                    backendStatus
                  )
                }
              ></span>

            </div>

            {/* PostgreSQL */}

            <div className="service">

              <div className="service-icon">
                DB
              </div>

              <div className="service-info">

                <h3>
                  PostgreSQL
                </h3>

                <p>

                  {databaseStatus ===
                  "Operational"

                    ? "Database connected"

                    : databaseStatus ===
                      "Checking..."

                    ? "Checking database..."

                    : "Database unavailable"}

                </p>

              </div>

              <span
                className={
                  getStatusClass(
                    databaseStatus
                  )
                }
              ></span>

            </div>

            {/* Kubernetes */}

            <div className="service">

              <div className="service-icon">
                K8s
              </div>

              <div className="service-info">

                <h3>
                  Kubernetes
                </h3>

                <p>
                  Deployment platform
                </p>

              </div>

              <span className="pending"></span>

            </div>

          </div>

        </section>

        {/* ================= ARCHITECTURE ================= */}

        <section className="architecture panel">

          <div className="panel-header">

            <div>

              <p className="label">
                DEPLOYMENT ARCHITECTURE
              </p>

              <h2>
                Blue-Green Traffic Flow
              </h2>

            </div>

            <span className="architecture-status">
              Active
            </span>

          </div>

          <div className="flow">

            <div className="flow-node">

              <div className="flow-icon">
                👤
              </div>

              <strong>
                Users
              </strong>

              <span>
                Internet Traffic
              </span>

            </div>

            <div className="flow-line active-line"></div>

            <div className="flow-node active-node">

              <div className="flow-icon">
                🔵
              </div>

              <strong>
                Blue
              </strong>

              <span>
                v1.0.0 • Active
              </span>

            </div>

            <div className="flow-line"></div>

            <div className="flow-node standby">

              <div className="flow-icon">
                🟢
              </div>

              <strong>
                Green
              </strong>

              <span>
                Standby
              </span>

            </div>

            <div className="flow-line"></div>

            <div className="flow-node">

              <div className="flow-icon">
                ☁️
              </div>

              <strong>
                AWS
              </strong>

              <span>
                Kubernetes
              </span>

            </div>

          </div>

        </section>

        {/* ================= MONITORING INFO ================= */}

        <section className="panel monitoring-panel">

          <div className="panel-header">

            <div>

              <p className="label">
                MONITORING
              </p>

              <h2>
                System Information
              </h2>

            </div>

          </div>

          <div className="monitoring-grid">

            <div>

              <span>
                Backend
              </span>

              <strong>
                {backendStatus}
              </strong>

            </div>

            <div>

              <span>
                PostgreSQL
              </span>

              <strong>
                {databaseStatus}
              </strong>

            </div>

            <div>

              <span>
                Products
              </span>

              <strong>
                {products.length}
              </strong>

            </div>

            <div>

              <span>
                Environment
              </span>

              <strong>
                Blue
              </strong>

            </div>

          </div>

          {lastChecked && (

            <p className="last-checked">

              Last health check:{" "}

              {lastChecked.toLocaleTimeString()}

            </p>

          )}

        </section>

        {/* ================= FOOTER ================= */}

        <footer>

          <span>
            DeployFlow • Blue-Green Deployment Demo
          </span>

          <span>
            Environment: Blue • Version: v1.0.0
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;
