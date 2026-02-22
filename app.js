import * as THREE from "https://cdn.jsdelivr.net";
import { OrbitControls } from "https://cdn.jsdelivr.net";

console.log("Скрипт завантажився!"); // Це з'явиться в консолі F12

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM готовий!"); 
    
    const w = document.getElementById("w"), d = document.getElementById("d"), h = document.getElementById("h"), mat = document.getElementById("mat");
    const wVal = document.getElementById("wVal"), dVal = document.getElementById("dVal"), hVal = document.getElementById("hVal"), priceEl = document.getElementById("price");

    if (!w || !wVal) {
        console.error("Помилка: Не знайдено ID в HTML!");
        return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const viewer = document.getElementById("viewer");
    const camera = new THREE.PerspectiveCamera(45, viewer.clientWidth / 500, 1, 10000);
    camera.position.set(2000, 1500, 2000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewer.clientWidth, 500);
    viewer.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));

    let shelf;

    function update() {
        console.log("Оновлення параметрів...");
        wVal.textContent = w.value;
        dVal.textContent = d.value;
        hVal.textContent = h.value;
        
        if (shelf) scene.remove(shelf);
        const geo = new THREE.BoxGeometry(+w.value, +h.value, +d.value);
        const mat3d = new THREE.MeshStandardMaterial({ color: mat.value === "mdf" ? 0x8b4513 : 0xaaaaaa });
        shelf = new THREE.Mesh(geo, mat3d);
        shelf.position.y = +h.value / 2;
        scene.add(shelf);
        
        priceEl.textContent = Math.round((w.value * h.value * d.value) / 1000000 * 5);
    }

    [w, d, h, mat].forEach(el => el.oninput = update);
    update();

    (function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    })();
});
