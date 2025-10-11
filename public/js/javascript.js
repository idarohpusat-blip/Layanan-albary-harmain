



// Ini untuk halaman Index
lucide.createIcons();
const menuMap = {
    "dashboardMenu": "dashboard.html",
    "pendafatarnmenu": "santri/pendaftaran/pendaftaran.html",





};

const pageTitles = {
    "dashboard.html": "Dashboard - Albary Haramain",
    "santri/pendaftaran/pendaftaran.html": "Pendaftaran - Albary Haramain",



};


// Load dashboard pertama kali
loadPage("santri/pendaftaran/pendaftaran.html");
//status btn


function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    const icon = document.getElementById("icon-" + id);
    submenu.classList.toggle("hidden");
    if (icon) icon.classList.toggle("rotate-90");
}

// Event listener untuk semua menu
document.addEventListener("click", e => {
    const link = e.target.closest("a[id]"); // cari <a> terdekat yang ada id
    if (!link) return; // kalau bukan link, abaikan

    e.preventDefault();
    const page = menuMap[link.id];
    if (!page) return; // kalau id tidak ada di menuMap, abaikan

    loadPage(page);

    // Update sidebar active (desktop)
    document.querySelectorAll(".menu-item").forEach(i =>
        i.classList.remove("bg-green-800", "shadow-md", "shadow-green-500", "border-2", "border-green-500")
    );
    if (link.classList.contains("menu-item")) {
        link.classList.add("bg-green-800", "shadow-md", "shadow-green-500", "border-2", "border-green-500");
    }

    // Tutup sidebar HP kalau sedang terbuka
    if (mobileSidebar.classList.contains("translate-x-0")) {
        mobileSidebar.classList.remove("translate-x-0");
        mobileSidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('aside'); // sidebar desktop/tablet
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    // Buat overlay untuk HP
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 z-40 hidden';
    document.body.appendChild(overlay);

    // Clone sidebar untuk HP
    const mobileSidebar = sidebar.cloneNode(true);
    mobileSidebar.classList.remove('hidden', 'md:flex');
    mobileSidebar.classList.add(
        'fixed', 'top-0', 'left-0', 'h-full', 'w-64',
        'z-50', 'transform', '-translate-x-full',
        'transition-transform', 'duration-300', 'bg-gradient-to-b', 'from-green-700', 'to-green-900'
    );
    document.body.appendChild(mobileSidebar);

    // Fungsi toggle sidebar HP
    function toggleSidebar() {
        const isOpen = mobileSidebar.classList.contains('translate-x-0');
        if (isOpen) {
            mobileSidebar.classList.remove('translate-x-0');
            mobileSidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        } else {
            mobileSidebar.classList.remove('-translate-x-full');
            mobileSidebar.classList.add('translate-x-0');
            overlay.classList.remove('hidden');
        }
    }

    hamburgerBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 🔹 Fungsi toggle submenu (dipakai desktop & mobile)
    function initSubmenuToggle(sidebarRoot) {
        sidebarRoot.querySelectorAll("[data-submenu]").forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const targetId = link.getAttribute("data-submenu");
                const submenu = sidebarRoot.querySelector(`#${targetId}`);
                const icon = link.querySelector("i[data-lucide='chevron-down']");

                if (submenu.classList.contains("hidden")) {
                    submenu.classList.remove("hidden");
                    icon.classList.add("rotate-180", "transition-transform", "duration-200");
                } else {
                    submenu.classList.add("hidden");
                    icon.classList.remove("rotate-180");
                }
            });
        });
    }

    // Aktifkan submenu toggle untuk sidebar desktop & mobile
    initSubmenuToggle(sidebar);
    initSubmenuToggle(mobileSidebar);

    // Aktifkan lucide icons
    if (window.lucide) lucide.createIcons();
});
// Batasa Akhir halaman Index

function loadPage(url) {
    const iframe = document.getElementById("mainContent");
    iframe.src = url; // ganti src iframe

    // Ganti judul header
    const headerTitle = document.getElementById("headerTitle");
    if (headerTitle && pageTitles[url]) {
        headerTitle.textContent = pageTitles[url];
    }

}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}
// Open modal
function openModal() {
    isEditing = false;
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modalTitle').textContent = 'Tambah Data Baru';
    document.getElementById('editId').value = '';
    document.getElementById('dataForm').reset();
    document.getElementById('modal').classList.remove('hidden');
}
// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal.querySelector('.modal-backdrop')) {
        closeModal();
    }
}



// ===== AWAL KODE KHUSUS HALAMAN Logout =====
document.getElementById("keluarMenu").addEventListener("click", logout);

let timeout;

Set durasi 5 menit (300000 ms)
const LOGOUT_TIME = 5 * 60 * 1000;

Reset timer setiap ada aktivitas
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        alert("Anda keluar karena tidak ada aktivitas selama 5 menit.");
        sessionStorage.removeItem('user'); // hapus session
        window.location.href = "login.html"; // redirect ke login
    }, LOGOUT_TIME);
}

// List aktivitas yang dianggap "aktif"
window.addEventListener("mousemove", resetTimer);
window.addEventListener("keydown", resetTimer);
window.addEventListener("click", resetTimer);
window.addEventListener("scroll", resetTimer);

// Mulai timer pertama kali saat halaman dibuka
resetTimer();

function logout() {
    // Hapus token terenkripsi
    // Opsional: hapus email dan password tersimpan
    sessionStorage.removeItem("user");

    // Tampilkan alert sukses logout
    alert("Berhasil logout!");

    // Redirect ke halaman login
    window.location.href = "login.html";

}
// ===== AKHIR KODE KHUSUS HALAMAN Logout =====
