// js/login.js

// 1. Nếu đã đăng nhập rồi thì đá về trang chủ luôn
if (localStorage.getItem("currentUser")) {
  window.location.href = "main.html";
}

const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password'); 

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const emailEntered = emailInput.value.trim();
        const passwordEntered = passwordInput.value.trim();

        // 2. Lấy danh sách user đã đăng ký từ LocalStorage
        const usersData = localStorage.getItem("users");
        
        if (!usersData) {
            alert("Chưa có tài khoản nào được đăng ký! Vui lòng đăng ký trước.");
            return;
        }

        const users = JSON.parse(usersData);

        // 3. Tìm xem có ai khớp Email và Password không
        // Lưu ý: Code cũ của bạn lưu field là 'email' và 'password' (thường)
        const validUser = users.find(user => 
            user.email === emailEntered && 
            user.password === passwordEntered
        );

        if (validUser) {
            // 4. Nếu đúng: Lưu người dùng hiện tại và chuyển trang
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            
            alert("Đăng nhập thành công!");
            window.location.href = 'main.html';
        } else {
            // 5. Nếu sai
            alert("Email hoặc mật khẩu không chính xác!");
        }
    });
}
