const API_URL = 'https://fakestoreapi.com/products';

// Dữ liệu giày (Giả lập vì API không có giày)
const shoesData = [
    { id: 201, title: "Nike Air Jordan 1", price: 150, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80" },
    { id: 202, title: "Adidas Yeezy Boost", price: 220, image: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F09%2Fyeezy-350-v2-closer-look-01.jpg?w=1080&cbr=1&q=90&fit=max" },
    { id: 203, title: "Converse Chuck 70", price: 85, image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=400&q=80" },
    { id: 204, title: "Vans Old Skool", price: 65, image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/140/774/products/vans-classic-old-skool-brick-red-true-white-vn000vokdic-1.png?v=1515860582993" },
    { id: 205, title: "New Balance 550", price: 110, image: "https://www.jordan1.vn/wp-content/uploads/2024/06/chi-tiet-ve-new-balance-550-ma-ban-nhat-dinh-phai-biet2.jpg" }
];

async function getProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // --- LỌC DỮ LIỆU (Chỉ lấy Quần áo nam & nữ) ---
        const fashionItems = data.filter(item => 
            item.category === "men's clothing" || 
            item.category === "women's clothing"
        );

        // --- PHẦN 1: PRODUCT (Lấy 10 món để xếp thành 2 hàng, mỗi hàng 5 món) ---
        const productsForBody2 = fashionItems.slice(0, 10);
        renderProducts(productsForBody2, 'product-list');

        // --- PHẦN 2: TRENDING (Lấy 4 món khác) ---
        // Đảo ngược danh sách một chút cho khác biệt
        const trendingItems = fashionItems.reverse().slice(0, 5); 
        renderProducts(trendingItems, 'trending-list');

        // --- PHẦN 3: SHOES (Dùng dữ liệu tự tạo) ---
        renderProducts(shoesData, 'shoe-list');

    } catch (error) {
        console.log("Lỗi:", error);
    }
}

function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Nếu chưa tạo div thì bỏ qua để không lỗi
    
    container.innerHTML = ""; 

    productList.forEach(product => {
        const priceFormatted = product.price + " $"; 
        
        const productHTML = `
            <div class="product-card">
                <div class="img-container">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 title="${product.title}">${product.title}</h3>
                    <p class="price">${priceFormatted}</p>
                    <div class="btn-group">
                        <button class="btn btn-buy" onclick="buyNow(${product.id})">MUA</button>
                        <button class="btn btn-cart" onclick="addToCart(${product.id})">THÊM</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

function buyNow(id) { alert("Mua sản phẩm ID: " + id); }
function addToCart(id) { alert("Đã thêm vào giỏ: " + id); }

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
});
const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn việc load lại trang mặc định

        const email = emailInput.value;

        // Logic giả lập: Lấy phần tên trước dấu @ của email để làm tên hiển thị
        // Ví dụ: admin@gmail.com -> Tên là "admin"
        const username = email.split('@')[0];

        // 1. Lưu tên vào bộ nhớ trình duyệt (localStorage)
        localStorage.setItem('currentUser', username);

        // 2. Chuyển hướng sang trang chủ
        alert("Đăng nhập thành công! Xin chào " + username);
        window.location.href = '/html/main.html'; // Đảm bảo đường dẫn đúng
    });
}
// --- XỬ LÝ HIỂN THỊ TÊN NGƯỜI DÙNG (AUTH) ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

function checkLoginStatus() {
    const userDisplay = document.getElementById('username-display');
    
    // Tìm đúng cái ID mình vừa thêm bên HTML
    const logoutBtn = document.getElementById('btn-logout'); 

    // 1. Lấy dữ liệu người dùng
    let savedUser = localStorage.getItem('currentUser');

    // 2. NẾU CÓ DỮ LIỆU (Đã đăng nhập)
    if (savedUser) {
        // Xử lý hiển thị tên (giữ nguyên logic của bạn)
        try {
            const userObj = JSON.parse(savedUser);
            if (userObj.USERNAME) savedUser = userObj.USERNAME;
            else if (userObj.username) savedUser = userObj.username;
        } catch (e) {}

        if (userDisplay) {
            userDisplay.innerText = savedUser;
        }
    } 
    // 3. NẾU KHÔNG CÓ DỮ LIỆU (Chưa đăng nhập) -> Đá về Login
    else {
        alert("Bạn chưa đăng nhập! Vui lòng quay lại trang đăng nhập.");
        window.location.href = 'login.html'; // Sửa lại đường dẫn cho đúng thư mục của bạn
    }

    // 4. XỬ LÝ SỰ KIỆN LOGOUT
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Chặn thẻ a chuyển trang
            
            // XÓA SẠCH DỮ LIỆU
            localStorage.removeItem('currentUser'); 
            
            alert("Đã đăng xuất!");
            
            // Chuyển về trang login
            window.location.href = 'index.html'; 
        });
    } else {
        console.error("Không tìm thấy nút Logout! Kiểm tra lại ID trong HTML.");
    }
}






