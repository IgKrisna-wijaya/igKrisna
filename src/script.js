function addItem() {
  const productList = document.getElementById("product-list");

  // Minta input dari user
  const name = prompt("Masukkan nama produk:");
  const price = prompt("Masukkan harga produk:");

  // Jika user batal, jangan tambahkan
  if (!name || !price) {
    alert("Produk batal ditambahkan.");
    return;
  }

  // Buat elemen baru
  const newItem = document.createElement("a");
  newItem.href = "#";
  newItem.className = "group";

  newItem.innerHTML = `
    <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg"
         alt="${name}"
         class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75" />
    <h3 class="mt-4 text-sm text-gray-700">${name}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">$${price}</p>
  `;

  // Tambahkan item sebelum tombol Add Item
  const addButton = productList.lastElementChild;
  productList.insertBefore(newItem, addButton);

  alert("Produk baru berhasil ditambahkan!");
}

function addToCart() {
  // Ambil data dari halaman
  const namaProduk = document.getElementById("product-name").innerText;
  const namaToko = document.getElementById("store-name").innerText;
  const harga = document.getElementById("price").innerText.replace("Rp.", "");
  const jumlah = parseInt(document.getElementById("quantity").innerText);
  const ukuran = document.getElementById("Size").querySelector('input[name="size"]:checked').value;
  const gambar = document.getElementById("Gambar").src;
  const Warna = document.getElementById("Color").querySelector('input[name="color"]:checked').value;


  // Buat objek produk
  const produk = {
    namaProduk: namaProduk,
    namaToko: namaToko,
    jumlah: jumlah,
    harga: harga,
    ukuran: ukuran,
    gambar: gambar,
    Warna: Warna,
    total: harga * jumlah
  };

  // Ambil data keranjang sebelumnya dari localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Tambahkan produk baru ke dalam cart
  cart.push(produk);

  // Simpan kembali ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  // Arahkan ke halaman main.html (opsional)
  window.location.href = "main.html";
}

function lihatCart() {
  // Ambil data dari localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    console.log("🛒 Keranjang masih kosong!");
    return;
  }

  console.log("=== Isi Keranjang ===");
  cart.forEach((item, index) => {
    console.log(`Produk #${index + 1}`);
    console.log(`Nama Produk : ${item.namaProduk}`);
    console.log(`Toko        : ${item.namaToko}`);
    console.log(`Ukuran      : ${item.ukuran}`);
    console.log(`Jumlah      : ${item.jumlah}`);
    console.log(`Harga       : Rp${item.harga}`);
    console.log(`Total       : Rp${item.total}`);
    console.log("Gambar      : " + item.gambar );
    console.log("Warna       : " + item.Warna );
    console.log("---------------------------");
  });
}

function addToCart2() {
  // Ambil data dari halaman
  const namaProduk = document.getElementById("product-name").innerText;
  const namaToko = document.getElementById("store-name").innerText;
  const harga = document.getElementById("price").innerText.replace("Rp.", "");
  const jumlah = parseInt(document.getElementById("quantity").value);
  const ukuran = document.getElementById("Size").querySelector('input[name="size"]:checked').value;
  const gambar = document.getElementById("Gambar").src;
  const Warna = document.getElementById("Color").querySelector('input[name="color"]:checked').value;

  // Buat objek produk
  const produkBaru = {
    namaProduk,
    namaToko,
    harga,
    jumlah,
    ukuran,
    Warna,
    gambar,
    total: harga * jumlah
  };

  // Ambil cart lama
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cek apakah produk dengan kombinasi yang sama sudah ada
  const indexSama = cart.findIndex(item =>
    item.namaProduk === produkBaru.namaProduk &&
    item.namaToko === produkBaru.namaToko &&
    item.ukuran === produkBaru.ukuran &&
    item.Warna === produkBaru.Warna
  );

  if (indexSama !== -1) {
    // Jika produk sama sudah ada → tambah jumlah & total
    cart[indexSama].jumlah += produkBaru.jumlah;
    cart[indexSama].total = cart[indexSama].harga * cart[indexSama].jumlah;
    console.log(`🟡 Produk sama ditemukan, jumlah ditambah menjadi ${cart[indexSama].jumlah}`);
  } else {
    // Jika belum ada → tambahkan produk baru
    cart.push(produkBaru);
    console.log(`🟢 Produk baru ditambahkan ke cart`);
  }

  // Simpan ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Arahkan ke halaman utama (opsional)
  window.location.href = "main.html";
}

function hapusCart() {
  localStorage.removeItem("cart");
  console.log("🧹 Semua isi keranjang sudah dihapus.");
}

function tampilkanCart() {
  const cartContainer = document.getElementById("cart-items"); // tempat menampung <li>
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Jika kosong
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-500 text-center py-4'>🛒 Keranjang masih kosong.</p>";
    return;
  }

  // Kosongkan container dulu
  cartContainer.innerHTML = "";

  // Loop setiap item
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "flex py-6";
    li.innerHTML = `
      <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src="${item.gambar}" alt="${item.namaProduk}" class="size-full object-cover" />
      </div>
      <div class="ml-4 flex flex-1 flex-col">
        <div>
          <div class="flex justify-between text-base font-medium text-gray-900">
            <h3><a href="#">${item.namaProduk}</a></h3>
            <p class="ml-4">Rp${item.total.toLocaleString("id-ID")}</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">${item.Warna} • ${item.ukuran}</p>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <p class="text-gray-500">Qty ${item.jumlah}</p>
          <div class="flex">
            <button 
              type="button" 
              class="font-medium text-indigo-600 hover:text-indigo-500"
              onclick="hapusItem(${index})"
            >Remove</button>
          </div>
        </div>
      </div>
    `;
    cartContainer.appendChild(li);
  });
}

function hapusItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // hapus item berdasarkan index
  localStorage.setItem("cart", JSON.stringify(cart));
  tampilkanCart(); // refresh tampilan
}

function hitungTotalHarga() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    const harga = parseFloat(item.harga);
    const jumlah = parseInt(item.jumlah);
    total += harga * jumlah;
  });

  // Tampilkan ke HTML
  const totalHargaElem = document.getElementById("total-harga");
  if (totalHargaElem) {
    totalHargaElem.innerText = `Rp${total.toLocaleString("id-ID")}`;
  }

  return total; // biar bisa dipakai juga oleh fungsi lain
}

function hitungTotalBarang() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalBarang = 0;

  cart.forEach(item => {
    totalBarang += parseInt(item.jumlah);
  });

  // Tampilkan ke elemen HTML (jika ada)
  const totalBarangElem = document.getElementById("total-barang");
  if (totalBarangElem) {
    totalBarangElem.innerText = totalBarang;
  }

  console.log(`🧺 Total semua barang: ${totalBarang}`);
  return totalBarang;
}
  function tampilkanOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    cartItems.innerHTML = ""; // kosongkan dulu

    let subtotal = 0;
    let shipping = 5000; // misal ongkir tetap
    cart.forEach((item, index) => {
      const totalItem = parseInt(item.harga) * parseInt(item.jumlah);
      subtotal += totalItem;

      const li = document.createElement("li");
      li.className = "flex py-4";
      li.innerHTML = `
        <div class="w-20 h-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src="${item.gambar}" alt="${item.namaProduk}" class="h-full w-full object-cover">
        </div>
        <div class="ml-4 flex flex-1 flex-col">
          <div class="flex justify-between text-sm font-medium text-gray-900">
            <h3>${item.namaProduk}</h3>
            <p>Rp${totalItem.toLocaleString()}</p>
          </div>
          <p class="text-sm text-gray-500">${item.Warna} / ${item.ukuran}</p>
          <p class="text-sm text-gray-500">Qty: ${item.jumlah}</p>
          <button onclick="hapusItem(${index})" class="text-indigo-600 text-sm hover:text-indigo-500 mt-1 text-left">Remove</button>
        </div>
      `;
      cartItems.appendChild(li);
    });

    subtotalEl.textContent = `Rp${subtotal.toLocaleString()}`;
    shippingEl.textContent = `Rp${shipping.toLocaleString()}`;
    totalEl.textContent = `Rp${(subtotal + shipping).toLocaleString()}`;
  }
  function updateShipping() {
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");
  const subtotalElement = document.getElementById("subtotal");

  // Ambil subtotal dari elemen (hapus 'Rp' dan ubah ke angka)
  const subtotal = parseInt(subtotalElement.innerText.replace("Rp", "").replace(/\./g, "")) || 0;

  // Cek pilihan pengiriman
  const selectedDelivery = document.querySelector('input[name="delivery"]:checked');

  let shippingCost = 0;
  if (selectedDelivery) {
    if (selectedDelivery.value === "standard") {
      shippingCost = 5000;
      ordership = 5000;
    } else if (selectedDelivery.value === "express") {
      shippingCost = 20000;
      ordership = 20000;
    }
  }

  // Update tampilan shipping dan total
  shippingElement.innerText = "Rp" + shippingCost.toLocaleString("id-ID");
  const total = subtotal + shippingCost;
  totalElement.innerText = "Rp" + total.toLocaleString("id-ID");
}

function tampilkanOrderItem() {
  console.log("🔄 Memuat ringkasan pesanan...");

  const orderItemsContainer = document.getElementById("order-items");
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");

  // Ambil data dari localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("🛒 Isi cart:", cart);

  if (cart.length === 0) {
    orderItemsContainer.innerHTML = `<p class="text-gray-500 text-sm">Keranjang kosong 😅</p>`;
    subtotalElement.textContent = "Rp0";
    shippingElement.textContent = "Rp0";
    totalElement.textContent = "Rp0";
    return;
  }

  // Hitung subtotal & tampilkan item
  orderItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    const totalItem = parseInt(item.harga) * item.jumlah;
    subtotal += totalItem;

    const li = document.createElement("li");
    li.className = "flex py-4";
    li.innerHTML = `
      <img src="${item.gambar}" alt="${item.namaProduk}" class="w-16 h-16 rounded-md object-cover">
      <div class="ml-4 flex-1">
        <div class="flex justify-between text-gray-900 font-medium">
          <h3>${item.namaProduk}</h3>
          <p>Rp${totalItem.toLocaleString("id-ID")}</p>
        </div>
        <p class="text-sm text-gray-500">${item.Warna}, ${item.ukuran} × ${item.jumlah}</p>
      </div>
    `;
    orderItemsContainer.appendChild(li);
  });

  // Tampilkan subtotal awal
  subtotalElement.textContent = `Rp${subtotal.toLocaleString("id-ID")}`;
  shippingElement.textContent = `Rp0`;
  totalElement.textContent = `Rp${subtotal.toLocaleString("id-ID")}`;

  // Tambahkan event listener untuk radio "delivery"
      let shippingCost = 5000;


      const total = subtotal + shippingCost;

      shippingElement.textContent = `Rp${shippingCost.toLocaleString("id-ID")}`;
      totalElement.textContent = `Rp${total.toLocaleString("id-ID")}`;

      console.log(`📦 Pengiriman: ${option.value}, Ongkir Rp${shippingCost}`);
    }