import os
from PIL import Image, ImageDraw, ImageFont

def create_og_image():
    W, H = 1200, 630
    
    # Base food photo - Crown Crust Pizza & Shawarma spread
    base_img_path = "public/images/food/pizza-crown-crust.jpg"
    if not os.path.exists(base_img_path):
        base_img_path = "public/images/hero-food.jpg"
        
    if os.path.exists(base_img_path):
        base = Image.open(base_img_path).convert("RGBA")
        aspect = base.width / base.height
        target_aspect = W / H
        if aspect > target_aspect:
            new_w = int(base.height * target_aspect)
            offset = (base.width - new_w) // 2
            base = base.crop((offset, 0, offset + new_w, base.height))
        else:
            new_h = int(base.width / target_aspect)
            offset = (base.height - new_h) // 2
            base = base.crop((0, offset, base.width, offset + new_h))
        base = base.resize((W, H), Image.Resampling.LANCZOS)
    else:
        base = Image.new("RGBA", (W, H), (15, 23, 42, 255))

    # Dark overlay gradient for readability on left: dark navy/charcoal (#0F172A)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    # Left-to-right gradient: dark charcoal on left, fades to show pizza on right
    for x in range(W):
        ratio = x / W
        if ratio < 0.58:
            alpha = int(245 - (ratio / 0.58) * 35) # 245 down to 210
        else:
            alpha = int(210 - ((ratio - 0.58) / 0.42) * 165) # 210 down to 45
        overlay_draw.line([(x, 0), (x, H)], fill=(15, 23, 42, alpha))

    # Composite base and overlay
    final_img = Image.alpha_composite(base, overlay)
    draw = ImageDraw.Draw(final_img)

    # Fonts
    font_bold = "C:/Windows/Fonts/ariblk.ttf"
    font_semi = "C:/Windows/Fonts/arialbd.ttf"
    font_regular = "C:/Windows/Fonts/arial.ttf"

    f_badge = ImageFont.truetype(font_bold, 19)
    f_title = ImageFont.truetype(font_bold, 54)
    f_tagline = ImageFont.truetype(font_semi, 23)
    f_bullets = ImageFont.truetype(font_semi, 21)
    f_footer_label = ImageFont.truetype(font_bold, 22)
    f_footer_sub = ImageFont.truetype(font_semi, 18)

    # 1. Top Badge Pill (Amber gold background with crimson text)
    badge_x, badge_y = 60, 42
    badge_text = "BALDIA CHOWK, KASUR • FOOD STREET LANDMARK"
    bbox = draw.textbbox((0, 0), badge_text, font=f_badge)
    bw, bh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 18, 9
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + bw + pad_x * 2, badge_y + bh + pad_y * 2],
        radius=20,
        fill=(245, 158, 11, 255) # Amber Gold #F59E0B
    )
    draw.text((badge_x + pad_x, badge_y + pad_y - 2), badge_text, font=f_badge, fill=(15, 23, 42, 255))

    # 2. Big Title (White with Top Taste in Gold/Crimson)
    title_y = 105
    draw.text((60, title_y), "TOP TASTE", font=f_title, fill=(245, 158, 11, 255)) # Gold
    draw.text((365, title_y), "SHAWARMA & PIZZA", font=f_title, fill=(255, 255, 255, 255)) # White

    # 3. Tagline
    tagline_y = 175
    draw.text((60, tagline_y), "Famous Shawarma, Crown Crust Pizza, Karahi, Handi & BBQ", font=f_tagline, fill=(251, 191, 36, 255))

    # 4. Bullet Points
    bullets = [
        "• Special Shawarma, Zinger & Chicken Open Platters",
        "• Crown Crust, Behari Kabab, Malai Boti & Lazania Pizzas",
        "• Desi Ghee Chicken & Mutton Karahi, Handi & BBQ Kababs",
        "• Open Daily 1:00 PM – 1:00 AM (Dine-in, Takeout & Delivery)",
        "• Opp. Mori Gate Baldia Chowk, Kasur",
    ]
    bullet_y = 228
    for bullet in bullets:
        draw.text((62, bullet_y), bullet, font=f_bullets, fill=(241, 245, 249, 255))
        bullet_y += 40

    # 5. Bottom Action Bar Pill
    footer_y = 485
    bar_w = 680
    bar_h = 85
    draw.rounded_rectangle(
        [60, footer_y, 60 + bar_w, footer_y + bar_h],
        radius=20,
        fill=(225, 29, 72, 245), # Crimson #E11D48
        outline=(245, 158, 11, 230), # Gold #F59E0B
        width=3
    )
    draw.text((85, footer_y + 14), "Order / WhatsApp: 0321-6592546  /  0304-0444496", font=f_footer_label, fill=(255, 255, 255, 255))
    draw.text((85, footer_y + 46), "Free Home Delivery (Min Rs 600)  |  4.0 ★ (272 Google Reviews)", font=f_footer_sub, fill=(254, 243, 199, 255))

    # Convert to RGB and save
    out_rgb = final_img.convert("RGB")
    
    targets = [
        "public/images/og-image.jpg",
        "public/images/og-image-menu.jpg",
        "src/app/opengraph-image.jpg",
        "src/app/twitter-image.jpg",
        "src/app/menu/opengraph-image.jpg",
        "src/app/menu/twitter-image.jpg",
    ]
    
    for t in targets:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        out_rgb.save(t, "JPEG", quality=90, optimize=True)
        size_kb = os.path.getsize(t) / 1024
        print(f"Saved {t} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_og_image()
