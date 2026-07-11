export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({
      error: "Yalnızca GET isteğine izin veriliyor.",
    });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return response.status(500).json({
      error: "Instagram erişim anahtarı bulunamadı.",
    });
  }

  try {
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
    ].join(",");

    const apiUrl =
      `https://graph.instagram.com/me/media` +
      `?fields=${fields}` +
      `&limit=8` +
      `&access_token=${encodeURIComponent(accessToken)}`;

    const instagramResponse = await fetch(apiUrl);
    const instagramData = await instagramResponse.json();

    if (!instagramResponse.ok || instagramData.error) {
      console.error("Instagram API hatası:", instagramData);

      return response.status(instagramResponse.status || 500).json({
        error:
          instagramData.error?.message ||
          "Instagram paylaşımları alınamadı.",
      });
    }

    response.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=1800"
    );

    return response.status(200).json({
      posts: instagramData.data || [],
    });
  } catch (error) {
    console.error("Instagram bağlantı hatası:", error);

    return response.status(500).json({
      error: "Instagram bağlantısı sırasında hata oluştu.",
    });
  }
}