<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <title>RSS · 豆芽的技术博客</title>
        <style>
          body { max-width: 720px; margin: 40px auto; padding: 0 20px;
                 font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
                 background: #f2efe7; color: #242b27; font-size: 14px; line-height: 1.7; }
          .box { background: #fbfaf4; border: 1px solid #ddd6c3; border-radius: 14px; padding: 28px 32px; }
          h1 { color: #1f7a4d; font-size: 20px; margin: 0 0 6px; }
          .tip { color: #4a544e; background: #eef3ee; border: 1px dashed #1f7a4d;
                 border-radius: 8px; padding: 12px 16px; margin: 18px 0; font-size: 13px; }
          .tip code { color: #1f7a4d; font-weight: 700; }
          h2 { font-size: 15px; color: #1f7a4d; margin: 24px 0 10px; }
          .item { padding: 10px 0; border-top: 1px dashed #ddd6c3; }
          .item a { color: #242b27; font-weight: 700; text-decoration: none; }
          .item a:hover { color: #1f7a4d; }
          .meta { font-size: 12px; color: #8a918c; margin-top: 3px; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1><xsl:value-of select="rss/channel/title" /></h1>
          <div><xsl:value-of select="rss/channel/description" /></div>
          <div class="tip">
            这是 RSS 订阅源。把 <code><xsl:value-of select="rss/channel/link" />rss.xml</code>
            复制到任意 RSS 阅读器（如 Feedly、Reeder、Follow）即可订阅更新。
          </div>
          <h2>$ ls ./posts</h2>
          <xsl:for-each select="rss/channel/item">
            <div class="item">
              <a href="{link}"><xsl:value-of select="title" /></a>
              <div class="meta">
                <xsl:value-of select="category" /> · <xsl:value-of select="pubDate" />
              </div>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
