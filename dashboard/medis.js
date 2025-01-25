document.addEventListener("DOMContentLoaded", function () {
    loadData();
});

function tambahData() {
    const namaTim = document.getElementById("namaTim").value;
    const jabatan = document.getElementById("jabatan").value;
    
    // Perbaikan pengambilan gender
    const genderInput = document.querySelector("input[name='jk']:checked");
    const gender = genderInput ? genderInput.value : "";

    const tempatLahir = document.getElementById("tempatLahir").value;
    const tanggalLahir = document.getElementById("tanggalLahir").value;
    const nik = document.getElementById("nik").value;
    const alamat = document.getElementById("alamat").value;
    const email = document.getElementById("email").value;
    const telepon = document.getElementById("telepon").value;

    if (!namaTim || !jabatan || !gender || !tempatLahir || !tanggalLahir || !nik || !alamat || !email || !telepon) {
        alert("Harap isi semua kolom formulir!");
        return;
    }

    const data = {
        namaTim,
        jabatan,
        gender,
        tempatLahir,
        tanggalLahir,
        nik,
        alamat,
        email,
        telepon,
    };

    let existingData = JSON.parse(localStorage.getItem("timMedisData")) || [];
    existingData.push(data);
    localStorage.setItem("timMedisData", JSON.stringify(existingData));

    document.getElementById("inputForm").reset();
    updateTable();
}

function loadData() {
    updateTable();
}

function updateTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    if (!tableBody) return; // Hindari error jika tabel belum ada di HTML

    tableBody.innerHTML = ""; // Bersihkan tabel sebelum memuat ulang

    const existingData = JSON.parse(localStorage.getItem("timMedisData")) || [];

    existingData.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.namaTim;
        row.insertCell(1).textContent = item.jabatan;
        row.insertCell(2).textContent = item.gender;
        row.insertCell(3).textContent = item.tempatLahir;
        row.insertCell(4).textContent = item.tanggalLahir;
        row.insertCell(5).textContent = item.nik;
        row.insertCell(6).textContent = item.alamat;
        row.insertCell(7).textContent = item.email;
        row.insertCell(8).textContent = item.telepon;

        const deleteCell = row.insertCell(9);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.onclick = function () {
            deleteData(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

function deleteData(index) {
    let existingData = JSON.parse(localStorage.getItem("timMedisData")) || [];
    existingData.splice(index, 1);
    localStorage.setItem("timMedisData", JSON.stringify(existingData));
    updateTable();
}

// Pastikan hanya menangani data tim medis
document.addEventListener("DOMContentLoaded", function () {
    const timMedisTableBody = document.querySelector("#datatable tbody");
    const timMedisData = JSON.parse(localStorage.getItem("dataTimMedis")) || [];

    function renderTable() {
        timMedisTableBody.innerHTML = "";
        timMedisData.forEach((medis, index) => {
            const row = `<tr>
                <td>${medis.nama}</td>
                <td>${medis.spesialis}</td>
                <td>${medis.noStr}</td>
                <td>${medis.telepon}</td>
                <td><button onclick="hapusTimMedis(${index})">Hapus</button></td>
            </tr>`;
            timMedisTableBody.innerHTML += row;
        });
    }

    function hapusTimMedis(index) {
        timMedisData.splice(index, 1);
        localStorage.setItem("dataTimMedis", JSON.stringify(timMedisData));
        renderTable();
    }

    renderTable();
});
