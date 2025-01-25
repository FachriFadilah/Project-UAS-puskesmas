document.addEventListener("DOMContentLoaded", function () {
    loadData();
});

function tambahData() {
    const namaPasien = document.getElementById("namaPasien").value;
    const penyakit = document.getElementById("penyakit").value;
    
    // Perbaikan pengambilan gender
    // const genderInput = document.querySelector("input[name='jk']:checked");
    // const gender = genderInput ? genderInput.value : "";

    const perempuan = document.getElementById("perempuan").value;
    const laki = document.getElementById("laki").value;
    const tempatlahir = document.getElementById("tempatlahir").value;
    const tanggallahir = document.getElementById("tanggallahir").value;
    const Nik = document.getElementById("Nik").value;
    const Alamat = document.getElementById("Alamat").value;
    const umur = document.getElementById("umur").value;
    const Telepon = document.getElementById("Telepon").value;

    if (!namaPasien || !penyakit || !gender || !tempatlahir || !laki || !perempuan ||!tanggallahir || !Nik || !Alamat || !umur || !Telepon) {
        alert("Harap isi semua kolom formulir!");
        return;
    }

    const data = {
        namaPasien,
        penyakit,
        gender,
        tempatlahir,
        tanggallahir,
        Nik,
        Alamat,
        umur,
        Telepon,
        laki,
        perempuan,
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
    const tableBody = document.querySelector("#datatable tbody");
    if (!tableBody) return; // Hindari error jika tabel belum ada di HTML

    tableBody.innerHTML = ""; // Bersihkan tabel sebelum memuat ulang

    const existingData = JSON.parse(localStorage.getItem("timMedisData")) || [];

    existingData.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.namaPasien;
        row.insertCell(1).textContent = item.penyakit;
        row.insertCell(2).textContent = item.laki;
        row.insertCell(3).textContent = item.tempatlahir;
        row.insertCell(4).textContent = item.tanggallahir;
        row.insertCell(5).textContent = item.Nik;
        row.insertCell(6).textContent = item.Alamat;
        row.insertCell(7).textContent = item.umur;
        row.insertCell(8).textContent = item.Telepon;
        row.insertCell(9).textContent = item.perempuan;

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

// Pastikan hanya menangani data pasien
document.addEventListener("DOMContentLoaded", function () {
    const pasienTableBody = document.querySelector("#datatable tbody");
    const pasienData = JSON.parse(localStorage.getItem("dataPasien")) || [];

    function renderTable() {
        pasienTableBody.innerHTML = "";
        pasienData.forEach((pasien, index) => {
            const row = `<tr>
                <td>${pasien.nama}</td>
                <td>${pasien.riwayat}</td>
                <td>${pasien.gender}</td>
                <td>${pasien.tempatLahir}</td>
                <td>${pasien.tanggalLahir}</td>
                <td>${pasien.nik}</td>
                <td>${pasien.alamat}</td>
                <td>${pasien.umur}</td>
                <td>${pasien.telepon}</td>
                <td><button onclick="hapusPasien(${index})">Hapus</button></td>
            </tr>`;
            pasienTableBody.innerHTML += row;
        });
    }

    function hapusPasien(index) {
        pasienData.splice(index, 1);
        localStorage.setItem("dataPasien", JSON.stringify(pasienData));
        renderTable();
    }

    renderTable();
});

