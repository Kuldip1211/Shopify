// ✅ app/routes/app.settings.jsx
import {
  Page,
  Card,
  BlockStack,
  Text,
  TextField,
  Button,
  InlineGrid,
  Divider,
  Spinner,
  Banner,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 🧠 Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // ✅ Fetch existing user from Prisma API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          setForm({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            phone: data.user.phone || "",
            email: data.user.email || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Handle form field changes
  const handleChange = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setSuccess(data.message);
      } else {
        setError(data.message || "Failed to save data");
      }
    } catch (err) {
      console.error("❌ Error saving data:", err);
      setError("An unexpected error occurred");
    }
  };

  // 🌀 Loading state
  if (loading) {
    return (
      <Page title="User Settings">
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <Spinner accessibilityLabel="Loading user info" size="large" />
        </div>
      </Page>
    );
  }

  return (
    <Page title="User Settings">
      <BlockStack gap="400">
        {success && (
          <Banner tone="success" title="Success">
            <p>{success}</p>
          </Banner>
        )}
        {error && (
          <Banner tone="critical" title="Error">
            <p>{error}</p>
          </Banner>
        )}

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              🧾 Update Your Information
            </Text>
            <Divider />

            <form onSubmit={handleSubmit}>
              <BlockStack gap="300">
                <TextField
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  autoComplete="given-name"
                />
                <TextField
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  autoComplete="family-name"
                />
                <TextField
                  label="Phone"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  autoComplete="tel"
                />
                <TextField
                  label="Email"
                  value={form.email}
                  onChange={handleChange("email")}
                  type="email"
                  autoComplete="email"
                />
                <Button submit primary>
                  Save
                </Button>
              </BlockStack>
            </form>
          </BlockStack>
        </Card>

        {user && (
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                👤 Current User Info
              </Text>
              <Divider />
              <InlineGrid columns={2} gap="200">
                <Text as="p" variant="bodyMd">
                  <strong>First Name:</strong> {user.firstName}
                </Text>
                <Text as="p" variant="bodyMd">
                  <strong>Last Name:</strong> {user.lastName}
                </Text>
                <Text as="p" variant="bodyMd">
                  <strong>Phone:</strong> {user.phone}
                </Text>
                <Text as="p" variant="bodyMd">
                  <strong>Email:</strong> {user.email}
                </Text>
              </InlineGrid>
            </BlockStack>
          </Card>
        )}
      </BlockStack>
    </Page>
  );
}
