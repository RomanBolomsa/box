import * as THREE from "https://cdn.jsdelivr.net";
import { OrbitControls } from "https://cdn.jsdelivr.net";

function init() {
    const container = document.getElementById("viewer");
    if (!container) return;
    const wIn = document.getElementById("w"), hIn = document.getElementById("h"), dIn = document.getElementById("d"), mat = document.getElementById("mat");
    const wV = document.getElementById("wVal"), hV = document.getElementById("hVal"), dV = document.getElementById("dVal"), pr = document.getElementById("price");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / 600, 1, 10000);
    camera.position.set(1500, 1000, 1500);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, 600);
    container.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));

    let box;

    function update() {
        if (box) scene.remove(box);
        const geometry = new THREE.BoxGeometry(+wIn.value, +hIn.value, +dIn.value);
        const material = new THREE.MeshStandardMaterial({ color: mat.value === "mdf" ? 0x8b4513 : 0xaaaaaa });
        box = new THREE.Mesh(geometry, material);
        box.position.y = +hIn.value / 2;
        scene.add(box);

        wV.textContent = wIn.value;
        hV.textContent = hIn.value;
        dV.textContent = dIn.value;
        pr.textContent = Math.round((wIn.value * hIn.value * dIn.value) / 1000000 * 5);
    }

    [wIn, hIn, dIn, mat].forEach(el => el.oninput = update);
    update();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

window.onload = init;
