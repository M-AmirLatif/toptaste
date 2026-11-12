import fs from "fs";
import path from "path";
import https from "https";

const imagesToDownload = [
  // SHAWARMA
  {
    file: "shawarma-special.jpg",
    url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "shawarma-chicken.jpg",
    url: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "shawarma-zinger.jpg",
    url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "shawarma-pizza.jpg",
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "shawarma-grill.jpg",
    url: "https://images.unsplash.com/photo-1633337474565-12c6a0b94c50?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "shawarma-chicken-platter.jpg",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "shawarma-zinger-platter.jpg",
    url: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
  },

  // PIZZAS
  {
    file: "pizza-crown-crust.jpg",
    url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-special.jpg",
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-malai-boti.jpg",
    url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-lazania.jpg",
    url: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-behari-kabab.jpg",
    url: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-kabab-stuffer.jpg",
    url: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-manakish.jpg",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-supreme.jpg",
    url: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-bbq.jpg",
    url: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-achari.jpg",
    url: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-tikka.jpg",
    url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-fajita.jpg",
    url: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-cheese.jpg",
    url: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-cheese-lover.jpg",
    url: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pizza-vegetable.jpg",
    url: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=800&auto=format&fit=crop&q=80"
  },

  // BURGERS
  {
    file: "burger-beef.jpg",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-double-beef.jpg",
    url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-crispy-filly.jpg",
    url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-zinger.jpg",
    url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-grill.jpg",
    url: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-pizza.jpg",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-malai-booti.jpg",
    url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-jumbo.jpg",
    url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "burger-patty.jpg",
    url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80"
  },

  // WRAPS
  {
    file: "wrap-special.jpg",
    url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "wrap-mughlai.jpg",
    url: "https://images.unsplash.com/photo-1633337474565-12c6a0b94c50?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "wrap-zinger.jpg",
    url: "https://images.unsplash.com/photo-1647428069502-c800c149eb07?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "wrap-grill.jpg",
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80"
  },

  // PARATHA ROLLS
  {
    file: "paratha-special.jpg",
    url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "paratha-pizza.jpg",
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "paratha-zinger.jpg",
    url: "https://images.unsplash.com/photo-1647428069502-c800c149eb07?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "paratha-grill.jpg",
    url: "https://images.unsplash.com/photo-1633337474565-12c6a0b94c50?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "paratha-kabab.jpg",
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "paratha-chicken.jpg",
    url: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&auto=format&fit=crop&q=80"
  },

  // SANDWICHES
  {
    file: "sandwich-beef.jpg",
    url: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "sandwich-grill.jpg",
    url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "sandwich-club.jpg",
    url: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&auto=format&fit=crop&q=80"
  },

  // PASTA & DONNER
  {
    file: "pasta-special.jpg",
    url: "https://images.unsplash.com/photo-1621996346565-e3d5d6281290?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pasta-crunchy.jpg",
    url: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "donner-box.jpg",
    url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=80"
  },

  // FRIES
  {
    file: "fries-cheese-loaded.jpg",
    url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "fries-loaded.jpg",
    url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "fries-garlic.jpg",
    url: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "fries-plain.jpg",
    url: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "chicken-nuggets.jpg",
    url: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
  },

  // STEAKS & FISH
  {
    file: "steak-chicken.jpg",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "fish-grill.jpg",
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
  },

  // BBQ
  {
    file: "bbq-chicken-kabab.jpg",
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-beef-kabab.jpg",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-reshmi-kabab.jpg",
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-gola-kabab.jpg",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-chicken-tikka.jpg",
    url: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-malai-boti.jpg",
    url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-chicken-leg.jpg",
    url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-chicken-chest.jpg",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-chicken-wings.jpg",
    url: "https://images.unsplash.com/photo-1527477378372-14074527f315?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-green-boti.jpg",
    url: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-cheese-kabab.jpg",
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-kastori-boti.jpg",
    url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "bbq-drumsticks.jpg",
    url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
  },

  // KARAHI
  {
    file: "karahi-special-chicken.jpg",
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-chicken.jpg",
    url: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-white-chicken.jpg",
    url: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-shanwari.jpg",
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-mutton.jpg",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-special-mutton.jpg",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-beef.jpg",
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "karahi-namkeen.jpg",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
  },

  // HANDI
  {
    file: "handi-special.jpg",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-chicken.jpg",
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-kabab-masala.jpg",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-mughlai.jpg",
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-makhni.jpg",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-achari.jpg",
    url: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-jalfrezi.jpg",
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "handi-ginger.jpg",
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
  },

  // ROTI & NAAN
  {
    file: "naan-roghni.jpg",
    url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "naan-garlic.jpg",
    url: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "naan-kalwanji.jpg",
    url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "paratha-tandoori.jpg",
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "naan-sada.jpg",
    url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "roti-tandoori.jpg",
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "fresh-salad.jpg",
    url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "raita-zeera.jpg",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
  },

  // DRINKS & EXTRAS
  {
    file: "drink-soft.jpg",
    url: "https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "water-pure.jpg",
    url: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "pita-bread.jpg",
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "extra-crispy-chicken.jpg",
    url: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
  },
  {
    file: "extra-sauces.jpg",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
  }
];

const destDir = path.resolve("public/images/food");
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, { headers: { "User-Agent": "Mozilla/5.0" } }, (res2) => {
          res2.pipe(file);
          file.on("finish", () => {
            file.close(resolve);
          });
        }).on("error", (err) => {
          fs.unlink(dest, () => reject(err));
        });
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log(`Starting download of ${imagesToDownload.length} food variety images...`);
  let count = 0;
  for (const item of imagesToDownload) {
    const outPath = path.join(destDir, item.file);
    try {
      await download(item.url, outPath);
      count++;
      console.log(`[${count}/${imagesToDownload.length}] Downloaded ${item.file}`);
    } catch (e) {
      console.error(`Failed to download ${item.file}:`, e.message);
    }
  }
  console.log(`Finished downloading ${count} food variety images.`);
}

run();
