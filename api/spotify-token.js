export default async function handler(req, res) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
  
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
  
      const data = await response.json();
      res.status(200).json(data); // includes access_token
    } catch (error) {
      console.error("Token error:", error);
      res.status(500).json({ error: "Failed to fetch token" });
    }
  }
  