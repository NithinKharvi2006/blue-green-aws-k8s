import { useEffect, useState } from "react";
import "./App.css";

const BACKEND_URL = "http://localhost:8090";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBackend();
    loadProducts();
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
      setBackendStatus("Offline");
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products`);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">BG</div>
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

          <small>AWS Kubernetes</small>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Header */}
        <header className="topbar">

          <div>
            <p className="breadcrumb">Infrastructure / Dashboard</p>
            <h1>Deployment Dashboard</h1>
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

        {/* Deployment Banner */}
        <section className="deployment-banner">

          <div className="banner-left">
            <div className="rocket">🚀</div>

            <div>
              <p className="label">CURRENT DEPLOYMENT</p>

              <h2>
                Blue Environment
                <span className="version">v1.0.0</span>
              </h2>

              <p className="description">
                Production traffic is currently served by the Blue environment.
              </p>
            </div>
          </div>

          <div className="deployment-state">
            <span className="green-dot"></span>
            Healthy
          </div>

        </section>

        {/* Metrics */}
        <section className="metrics">

          <div className="metric-card">
            <div className="metric-icon blue">◆</div>

            <div>
              <p>Active Environment</p>
              <h3>BLUE</h3>
              <span className="positive">● Serving traffic</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon green">✓</div>

            <div>
              <p>Backend Status</p>
              <h3>{backendStatus}</h3>
              <span className="positive">● API responding</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon purple">⚡</div>

            <div>
              <p>Application Version</p>
              <h3>v1.0.0</h3>
              <span>Spring Boot</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon orange">☁</div>

            <div>
              <p>Platform</p>
              <h3>AWS</h3>
              <span>us-east-1</span>
            </div>
          </div>

        </section>

        {/* Main Grid */}
        <section className="dashboard-grid">

          {/* Products */}
          <div className="panel products-panel">

            <div className="panel-header">
              <div>
                <p className="label">APPLICATION DATA</p>
                <h2>Products</h2>
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

                  <div className="product-card" key={product.id}>

                    <div className="product-image">
                      {product.name.charAt(0)}
                    </div>

                    <div className="product-info">
                      <h3>{product.name}</h3>

                      <p>
                        Product ID #{product.id}
                      </p>

                      <strong>
                        ₹{Number(product.price).toLocaleString("en-IN")}
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

          {/* System Panel */}
          <div className="panel system-panel">

            <div className="panel-header">
              <div>
                <p className="label">SYSTEM</p>
                <h2>Service Health</h2>
              </div>

              <span className="healthy">
                Healthy
              </span>
            </div>

            <div className="service">

              <div className="service-icon">
                API
              </div>

              <div className="service-info">
                <h3>Spring Boot Backend</h3>
                <p>localhost:8090</p>
              </div>

              <span className="service-status"></span>

            </div>

            <div className="service">

              <div className="service-icon">
                DB
              </div>

              <div className="service-info">
                <h3>PostgreSQL</h3>
                <p>Database integration</p>
              </div>

              <span className="pending"></span>

            </div>

            <div className="service">

              <div className="service-icon">
                K8s
              </div>

              <div className="service-info">
                <h3>Kubernetes</h3>
                <p>Deployment platform</p>
              </div>

              <span className="pending"></span>

            </div>

          </div>

        </section>

        {/* Architecture */}
        <section className="architecture panel">

          <div className="panel-header">

            <div>
              <p className="label">DEPLOYMENT ARCHITECTURE</p>
              <h2>Blue-Green Traffic Flow</h2>
            </div>

            <span className="architecture-status">
              Active
            </span>

          </div>

          <div className="flow">

            <div className="flow-node">
              <div className="flow-icon">👤</div>
              <strong>Users</strong>
              <span>Internet Traffic</span>
            </div>

            <div className="flow-line active-line"></div>

            <div className="flow-node active-node">
              <div className="flow-icon">🔵</div>
              <strong>Blue</strong>
              <span>v1.0.0 • Active</span>
            </div>

            <div className="flow-line"></div>

            <div className="flow-node standby">
              <div className="flow-icon">🟢</div>
              <strong>Green</strong>
              <span>Standby</span>
            </div>

            <div className="flow-line"></div>

            <div className="flow-node">
              <div className="flow-icon">☁️</div>
              <strong>AWS</strong>
              <span>Kubernetes</span>
            </div>

          </div>

        </section>

        {/* Footer */}
        <footer>
          <span>DeployFlow • Blue-Green Deployment Demo</span>
          <span>Environment: Blue • Version: v1.0.0</span>
        </footer>

      </main>

    </div>
  );
}

export default App;
