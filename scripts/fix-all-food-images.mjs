import fs from "fs";
import path from "path";
import https from "https";

const TARGET_DIR = "public/images/food";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          "User-Agent": "TopTasteKasurApp/1.0 (amirlatif@toptaste.pk) node-https"
        }
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close(() => {
            const sz = fs.statSync(dest).size;
            if (sz < 5000) {
              return reject(new Error(`Downloaded file too small: ${sz} bytes`));
            }
            resolve(sz);
          });
        });
      }
    ).on("error", reject);
  });
}

function copyLocal(src, dest) {
  fs.copyFileSync(src, dest);
  const sz = fs.statSync(dest).size;
  return sz;
}

const fixes = [
  // 1. Grill Shawarma (corrupt 29b) -> Local high-res shawarma
  {
    type: "copy",
    src: "public/images/shawarma.jpg",
    dest: path.join(TARGET_DIR, "shawarma-grill.jpg"),
    label: "Grill Shawarma"
  },
  // 2. Mughlai Wrap (corrupt 29b) -> Local high-res chicken wrap
  {
    type: "copy",
    src: "public/images/chicken-wrap.jpg",
    dest: path.join(TARGET_DIR, "wrap-mughlai.jpg"),
    label: "Mughlai Wrap"
  },
  // 3. Zinger Wrap (corrupt 29b) -> Real chicken wrap
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Smoked_chicken_and_avocado_wrap.jpg/1280px-Smoked_chicken_and_avocado_wrap.jpg",
    dest: path.join(TARGET_DIR, "wrap-zinger.jpg"),
    label: "Zinger Wrap"
  },
  // 4. Zinger Paratha Roll (corrupt 29b) -> Flaky Kolkata Paratha Roll
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Kolkata_Rolls.jpg/1280px-Kolkata_Rolls.jpg",
    dest: path.join(TARGET_DIR, "paratha-zinger.jpg"),
    label: "Zinger Paratha Roll"
  },
  // 5. Grill Paratha Roll (corrupt 29b) -> Grilled Kebab Roll
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Rullakebab%2C_Lappeenranta%2C_helmikuu_2016.jpg/1280px-Rullakebab%2C_Lappeenranta%2C_helmikuu_2016.jpg",
    dest: path.join(TARGET_DIR, "paratha-grill.jpg"),
    label: "Grill Paratha Roll"
  },
  // 6. Kabab Paratha Roll (was aquarium fish!) -> Lula Kebab flatbread roll
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lula_kebab_2.jpg/1280px-Lula_kebab_2.jpg",
    dest: path.join(TARGET_DIR, "paratha-kabab.jpg"),
    label: "Kabab Paratha Roll"
  },
  // 7. Top Taste Special Pasta (corrupt 29b) -> Local high-res creamy pasta
  {
    type: "copy",
    src: "public/images/creamy-pasta.jpg",
    dest: path.join(TARGET_DIR, "pasta-special.jpg"),
    label: "Special Pasta"
  },
  // 8. Loaded Fries (corrupt 29b) -> Local high-res loaded fries
  {
    type: "copy",
    src: "public/images/loaded-fries.jpg",
    dest: path.join(TARGET_DIR, "fries-loaded.jpg"),
    label: "Loaded Fries"
  },
  // 9. Chicken Kabab (was aquarium fish!) -> Real Pakistani Beef & Chicken Seekh Kababs
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pakistani_Food_Beef_Kabobs.jpg/1280px-Pakistani_Food_Beef_Kabobs.jpg",
    dest: path.join(TARGET_DIR, "bbq-chicken-kabab.jpg"),
    label: "Chicken Kabab"
  },
  // 10. Reshmi Kabab (was aquarium fish!) -> Melt-in-mouth Mutton Seekh Kabab
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mutton_Seekh_%289454117913%29.jpg/1280px-Mutton_Seekh_%289454117913%29.jpg",
    dest: path.join(TARGET_DIR, "bbq-reshmi-kabab.jpg"),
    label: "Reshmi Kabab"
  },
  // 11. Chicken Wings BBQ (corrupt 29b) -> Local high-res wings
  {
    type: "copy",
    src: "public/images/gallery-wings.jpg",
    dest: path.join(TARGET_DIR, "bbq-chicken-wings.jpg"),
    label: "Chicken Wings BBQ"
  },
  // 12. Chicken Cheese Kabab (was aquarium fish!) -> Long Seekh Kabab Koobideh
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Iranian_Kabab_Koobideh_%28Bonab_style%29.jpg/1280px-Iranian_Kabab_Koobideh_%28Bonab_style%29.jpg",
    dest: path.join(TARGET_DIR, "bbq-cheese-kabab.jpg"),
    label: "Chicken Cheese Kabab"
  },
  // 13. Special Chicken Karahi (was samosas!) -> Punjabi Chicken Karahi in iron wok
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Punjabi_Chicken_Karahi.JPG/1280px-Punjabi_Chicken_Karahi.JPG",
    dest: path.join(TARGET_DIR, "karahi-special-chicken.jpg"),
    label: "Special Chicken Karahi"
  },
  // 14. Chicken Shanwari Karahi (was samosas!) -> Chicken Karahi in Pakistan
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Chicken_Karahi_in_Pakistan.jpg/1280px-Chicken_Karahi_in_Pakistan.jpg",
    dest: path.join(TARGET_DIR, "karahi-shanwari.jpg"),
    label: "Chicken Shanwari Karahi"
  },
  // 15. Mutton Karahi (was rice thali!) -> Balti Gosht in authentic Karahi
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Balti_gosht.jpg/1280px-Balti_gosht.jpg",
    dest: path.join(TARGET_DIR, "karahi-mutton.jpg"),
    label: "Mutton Karahi"
  },
  // 16. Special Mutton Karahi (was rice thali!) -> Rich Kashmiri Rogan Josh Mutton Karahi
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rogan_Josh_Kashmiri.jpg/1280px-Rogan_Josh_Kashmiri.jpg",
    dest: path.join(TARGET_DIR, "karahi-special-mutton.jpg"),
    label: "Special Mutton Karahi"
  },
  // 17. Beef Karahi & Special Beef Karahi (was samosas!) -> Pakistani Food Karahi Beef in iron wok
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pakistani_Food_Karahi_Beef.jpg/1280px-Pakistani_Food_Karahi_Beef.jpg",
    dest: path.join(TARGET_DIR, "karahi-beef.jpg"),
    label: "Beef Karahi"
  },
  // 18. Mutton Namkeen Karahi (was rice thali!) -> Pasanda / Namkeen braised meat
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pasanda_Curry.JPG/1280px-Pasanda_Curry.JPG",
    dest: path.join(TARGET_DIR, "karahi-namkeen.jpg"),
    label: "Mutton Namkeen Karahi"
  },
  // 19. Chicken Jalferazi Handi (was samosas!) -> Authentic Chicken Jalfrezi
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chicken_Jalfrezi_%282103956162%29.jpg/1280px-Chicken_Jalfrezi_%282103956162%29.jpg",
    dest: path.join(TARGET_DIR, "handi-jalfrezi.jpg"),
    label: "Chicken Jalfrezi Handi"
  },
  // 20. Mineral Water (corrupt 29b) -> Clean pure water bottle
  {
    type: "download",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Water_Bottle_%2851308317077%29.jpg",
    dest: path.join(TARGET_DIR, "water-pure.jpg"),
    label: "Mineral Water"
  }
];

async function main() {
  console.log(`Starting to apply ${fixes.length} image fixes...`);
  for (const fix of fixes) {
    try {
      if (fix.type === "copy") {
        const sz = copyLocal(fix.src, fix.dest);
        console.log(`[COPIED] ${fix.label}: ${fix.dest} (${sz} bytes)`);
      } else {
        const sz = await download(fix.url, fix.dest);
        console.log(`[DOWNLOADED] ${fix.label}: ${fix.dest} (${sz} bytes)`);
      }
    } catch (err) {
      console.error(`[ERROR] ${fix.label}:`, err.message);
    }
  }
  console.log("All fixes processed.");
}

main();
