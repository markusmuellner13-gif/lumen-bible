// Returns the VAPID public key so the client can subscribe (no rebuild needed).
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=600');
  res.status(200).json({ key: process.env.VAPID_PUBLIC_KEY || null });
}
