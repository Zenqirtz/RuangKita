import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Icon from '@/Components/RuangKita/Icon';
import { useLanguage } from '@/Context/LanguageContext';

const VETERAN_FLOORS = [
    {
        floor: 1,
        label: 'Lt. 1',
        yBase: 0.35,
        rooms: [
            { id: 1, x: -4.2, z: -2.6, w: 3.6, d: 3.4 },
            { id: 2, x: 0.0, z: -2.6, w: 3.6, d: 3.4 },
            { id: 19, x: 4.2, z: -2.6, w: 3.6, d: 3.4 },
            { id: 4, x: -2.4, z: 2.3, w: 6.8, d: 3.4 },
            { id: 21, x: 3.6, z: 2.3, w: 4.6, d: 3.4 },
        ],
    },
    {
        floor: 2,
        label: 'Lt. 2',
        yBase: 3.65,
        rooms: [
            { id: 8, x: -4.2, z: -2.6, w: 3.6, d: 3.4 },
            { id: 9, x: 0.0, z: -2.6, w: 3.6, d: 3.4 },
            { id: 10, x: 4.2, z: -2.6, w: 3.6, d: 3.4 },
            { id: 15, x: -4.2, z: 2.3, w: 3.6, d: 3.4 },
            { id: 18, x: 0.0, z: 2.3, w: 3.6, d: 3.4 },
            { id: 17, x: 4.2, z: 2.3, w: 3.6, d: 3.4 },
        ],
    },
    {
        floor: 3,
        label: 'Lt. 3',
        yBase: 6.95,
        rooms: [
            { id: 5, x: -4.2, z: -2.6, w: 3.6, d: 3.4 },
            { id: 6, x: 0.0, z: -2.6, w: 3.6, d: 3.4 },
            { id: 7, x: 4.2, z: -2.6, w: 3.6, d: 3.4 },
            { id: 3, x: -4.5, z: 2.3, w: 2.7, d: 3.4 },
            { id: 11, x: -1.5, z: 2.3, w: 2.7, d: 3.4 },
            { id: 12, x: 1.5, z: 2.3, w: 2.7, d: 3.4 },
            { id: 16, x: 4.5, z: 2.3, w: 2.7, d: 3.4 },
        ],
    },
];

const DIENG_FLOORS = [
    {
        floor: 1,
        label: 'Dieng',
        yBase: 0.35,
        rooms: [
            { id: 13, x: -4.2, z: 0.0, w: 3.6, d: 6.8 },
            { id: 14, x: 0.0, z: 0.0, w: 3.6, d: 6.8 },
            { id: 20, x: 4.2, z: 0.0, w: 3.6, d: 6.8 },
        ],
    },
];

function createLabelTexture(code, name, bgHex, textHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle inner border
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 10;
    ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

    // Code pill
    ctx.fillStyle = 'rgba(15, 23, 42, 0.14)';
    ctx.fillRect(40, 44, 210, 48);
    ctx.fillStyle = textHex;
    ctx.font = 'bold 26px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(code, 54, 68);

    // Room Name (wrapped)
    ctx.fillStyle = textHex;
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    const words = name.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width > 420 && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);

    const startY = 200 - ((lines.length - 1) * 26);
    lines.slice(0, 3).forEach((line, idx) => {
        ctx.fillText(line, canvas.width / 2, startY + idx * 52);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function getColors(isSelected, isHovered, isBooked) {
    if (isSelected) {
        return { side: 0x1d4ed8, topHex: '#2563EB', textHex: '#FFFFFF' };
    }
    if (isHovered) {
        return { side: 0x3b82f6, topHex: '#60A5FA', textHex: '#FFFFFF' };
    }
    if (isBooked) {
        return { side: 0xd97706, topHex: '#FCD34D', textHex: '#78350F' };
    }
    return { side: 0x10b981, topHex: '#A7F3D0', textHex: '#064E3B' };
}

export default function RoomFloorPlan3D({ rooms = [] }) {
    const { t } = useLanguage();
    const mountRef = useRef(null);
    const controlsRef = useRef(null);
    const cameraRef = useRef(null);
    const roomMeshesRef = useRef([]);
    const selectedIdRef = useRef(1);
    const hoveredIdRef = useRef(null);

    const [campus, setCampus] = useState('veteran');
    const [focusFloor, setFocusFloor] = useState('all');
    const [selectedRoomId, setSelectedRoomId] = useState(1);
    const [hoveredRoomId, setHoveredRoomId] = useState(null);

    selectedIdRef.current = selectedRoomId;
    hoveredIdRef.current = hoveredRoomId;

    const roomMap = useMemo(() => {
        const map = {};
        rooms.forEach((r) => {
            map[Number(r.id)] = r;
        });
        return map;
    }, [rooms]);

    const selectedRoom = useMemo(() => {
        return roomMap[Number(selectedRoomId)] ?? rooms[0];
    }, [roomMap, selectedRoomId, rooms]);

    const setCameraPreset = (preset) => {
        const camera = cameraRef.current;
        const controls = controlsRef.current;
        if (!camera || !controls) return;

        if (preset === 'iso') {
            camera.position.set(14, 13, 15);
        } else if (preset === 'front') {
            camera.position.set(0, 7, 19);
        } else if (preset === 'top') {
            camera.position.set(0, 22, 2);
        }
        controls.target.set(0, campus === 'veteran' && focusFloor === 'all' ? 3.8 : 1.5, 0);
        controls.update();
    };

    const handleCampusChange = (nextCampus) => {
        setCampus(nextCampus);
        setFocusFloor('all');
        setSelectedRoomId(nextCampus === 'dieng' ? 13 : 1);
    };

    // Build Three.js Scene
    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 720;
        const height = container.clientHeight || 480;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf1f5f9);
        scene.fog = new THREE.Fog(0xf1f5f9, 32, 65);

        const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
        const targetY = campus === 'veteran' && focusFloor === 'all' ? 3.8 : 1.5;
        camera.position.set(14, campus === 'veteran' && focusFloor === 'all' ? 13.5 : 10, 15);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;
        controls.maxPolarAngle = Math.PI / 2 - 0.04;
        controls.minDistance = 8;
        controls.maxDistance = 36;
        controls.target.set(0, targetY, 0);
        controls.update();
        controlsRef.current = controls;

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.85);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
        dirLight.position.set(14, 24, 14);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 2;
        dirLight.shadow.camera.far = 60;
        const d = 16;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xbfdbfe, 0.4);
        fillLight.position.set(-12, 10, -10);
        scene.add(fillLight);

        // Campus Ground & Landscaping
        const groundGeo = new THREE.BoxGeometry(22, 0.3, 18);
        const groundMat = new THREE.MeshStandardMaterial({
            color: campus === 'dieng' ? 0xdcfce7 : 0xe2e8f0,
            roughness: 0.9,
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.position.y = -0.15;
        ground.receiveShadow = true;
        scene.add(ground);

        const gridHelper = new THREE.GridHelper(22, 22, 0xcbd5e1, 0xe2e8f0);
        gridHelper.position.y = 0.01;
        scene.add(gridHelper);

        // Entrance Walkway & Steps
        const walkway = new THREE.Mesh(
            new THREE.BoxGeometry(3.4, 0.08, 3.2),
            new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.7 })
        );
        walkway.position.set(0, 0.04, 6.2);
        walkway.receiveShadow = true;
        scene.add(walkway);

        // Stylized Campus Trees
        const addTree = (tx, tz) => {
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.14, 0.18, 1.1, 8),
                new THREE.MeshStandardMaterial({ color: 0x78350f })
            );
            trunk.position.set(tx, 0.55, tz);
            trunk.castShadow = true;
            scene.add(trunk);

            const foliage = new THREE.Mesh(
                new THREE.ConeGeometry(0.8, 1.9, 8),
                new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8 })
            );
            foliage.position.set(tx, 1.75, tz);
            foliage.castShadow = true;
            scene.add(foliage);
        };
        addTree(-8.4, 6.2);
        addTree(-8.4, -5.8);
        addTree(8.4, 6.2);
        addTree(8.4, -5.8);

        // Active Floors
        const floorsToRender =
            campus === 'dieng'
                ? DIENG_FLOORS
                : focusFloor === 'all'
                  ? VETERAN_FLOORS
                  : VETERAN_FLOORS.filter((f) => f.floor === focusFloor).map((f) => ({ ...f, yBase: 0.35 }));

        const createdTextures = [];
        const interactiveMeshes = [];

        floorsToRender.forEach((floorCfg, floorIdx) => {
            const fy = floorCfg.yBase;

            // Structural Floor Slab
            const slab = new THREE.Mesh(
                new THREE.BoxGeometry(13.6, 0.35, 9.6),
                new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.65 })
            );
            slab.position.set(0, fy, 0);
            slab.castShadow = true;
            slab.receiveShadow = true;
            scene.add(slab);

            // Slab Edge Accent Trim
            const trim = new THREE.Mesh(
                new THREE.BoxGeometry(13.7, 0.1, 9.7),
                new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 })
            );
            trim.position.set(0, fy - 0.14, 0);
            scene.add(trim);

            // Glass Balcony Railing on Front Edge
            const glass = new THREE.Mesh(
                new THREE.BoxGeometry(13.4, 0.55, 0.08),
                new THREE.MeshStandardMaterial({
                    color: 0x60a5fa,
                    transparent: true,
                    opacity: 0.28,
                    roughness: 0.1,
                })
            );
            glass.position.set(0, fy + 0.45, 4.76);
            scene.add(glass);

            // Corner Concrete Columns connecting floors
            if (campus === 'veteran' && focusFloor === 'all' && floorIdx < floorsToRender.length - 1) {
                const colGeo = new THREE.BoxGeometry(0.32, 3.3, 0.32);
                const colMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.6 });
                [
                    [-6.55, -4.55],
                    [6.55, -4.55],
                    [-6.55, 4.55],
                    [6.55, 4.55],
                ].forEach(([cx, cz]) => {
                    const col = new THREE.Mesh(colGeo, colMat);
                    col.position.set(cx, fy + 1.65, cz);
                    col.castShadow = true;
                    scene.add(col);
                });
            }

            // 3D Room Blocks
            floorCfg.rooms.forEach((slot) => {
                const room = roomMap[slot.id];
                if (!room) return;

                const isSelected = Number(selectedIdRef.current) === Number(room.id);
                const isBooked = room.status === 'booked';
                const colors = getColors(isSelected, false, isBooked);
                const tex = createLabelTexture(room.code, room.shortName, colors.topHex, colors.textHex);
                createdTextures.push(tex);

                const sideMat = new THREE.MeshStandardMaterial({ color: colors.side, roughness: 0.45 });
                const topMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35 });

                const roomHeight = 1.45;
                const roomGeo = new THREE.BoxGeometry(slot.w, roomHeight, slot.d);
                // BoxGeometry face order: +x, -x, +y (top), -y, +z, -z
                const mesh = new THREE.Mesh(roomGeo, [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]);
                mesh.position.set(slot.x, fy + 0.18 + roomHeight / 2 + (isSelected ? 0.35 : 0), slot.z);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.userData = {
                    room,
                    baseY: fy + 0.18 + roomHeight / 2,
                    sideMat,
                    topMat,
                };
                scene.add(mesh);
                interactiveMeshes.push(mesh);
            });
        });

        roomMeshesRef.current = interactiveMeshes;

        // Raycaster for hover & click
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        let downPos = { x: 0, y: 0 };

        const updatePointer = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const onPointerDown = (event) => {
            downPos = { x: event.clientX, y: event.clientY };
        };

        const onPointerUp = (event) => {
            const dist = Math.hypot(event.clientX - downPos.x, event.clientY - downPos.y);
            if (dist > 6) return; // user was orbiting/dragging

            updatePointer(event);
            raycaster.setFromCamera(pointer, camera);
            const hits = raycaster.intersectObjects(roomMeshesRef.current, false);
            if (hits.length > 0) {
                const hitRoom = hits[0].object.userData.room;
                if (hitRoom) {
                    setSelectedRoomId(hitRoom.id);
                }
            }
        };

        const onPointerMove = (event) => {
            updatePointer(event);
            raycaster.setFromCamera(pointer, camera);
            const hits = raycaster.intersectObjects(roomMeshesRef.current, false);
            if (hits.length > 0) {
                renderer.domElement.style.cursor = 'pointer';
                const hitId = hits[0].object.userData.room?.id ?? null;
                if (hitId !== hoveredIdRef.current) {
                    setHoveredRoomId(hitId);
                }
            } else {
                renderer.domElement.style.cursor = 'grab';
                if (hoveredIdRef.current !== null) {
                    setHoveredRoomId(null);
                }
            }
        };

        renderer.domElement.style.cursor = 'grab';
        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        renderer.domElement.addEventListener('pointerup', onPointerUp);
        renderer.domElement.addEventListener('pointermove', onPointerMove);

        // Resize handling
        const resizeObserver = new ResizeObserver(() => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (w > 0 && h > 0) {
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            }
        });
        resizeObserver.observe(container);

        // Animation Loop (smooth elevation + orbit damping)
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            roomMeshesRef.current.forEach((mesh) => {
                const { room, baseY } = mesh.userData;
                const isSel = Number(selectedIdRef.current) === Number(room.id);
                const isHov = Number(hoveredIdRef.current) === Number(room.id);
                const targetMeshY = baseY + (isSel ? 0.42 : isHov ? 0.2 : 0);
                mesh.position.y += (targetMeshY - mesh.position.y) * 0.18;
            });
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            resizeObserver.disconnect();
            renderer.domElement.removeEventListener('pointerdown', onPointerDown);
            renderer.domElement.removeEventListener('pointerup', onPointerUp);
            renderer.domElement.removeEventListener('pointermove', onPointerMove);
            controls.dispose();
            createdTextures.forEach((tex) => tex.dispose());
            renderer.dispose();
        };
    }, [campus, focusFloor, roomMap]);

    // Update room material colors when selectedRoomId or hoveredRoomId changes without rebuilding scene
    useEffect(() => {
        roomMeshesRef.current.forEach((mesh) => {
            const { room, sideMat, topMat } = mesh.userData;
            const isSelected = Number(selectedRoomId) === Number(room.id);
            const isHovered = Number(hoveredRoomId) === Number(room.id);
            const isBooked = room.status === 'booked';
            const colors = getColors(isSelected, isHovered, isBooked);

            sideMat.color.setHex(colors.side);
            const newTex = createLabelTexture(room.code, room.shortName, colors.topHex, colors.textHex);
            if (topMat.map) topMat.map.dispose();
            topMat.map = newTex;
            topMat.needsUpdate = true;
        });
    }, [selectedRoomId, hoveredRoomId]);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
            {/* WebGL 3D Building Canvas */}
            <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between overflow-hidden">
                {/* Top Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => handleCampusChange('veteran')}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                                campus === 'veteran'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Gedung Kampus Veteran (3 Lt)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCampusChange('dieng')}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                                campus === 'dieng'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Gedung Kampus Dieng
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {campus === 'veteran' && (
                            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                                {[
                                    { id: 'all', label: 'Gedung Utuh' },
                                    { id: 1, label: 'Lt. 1' },
                                    { id: 2, label: 'Lt. 2' },
                                    { id: 3, label: 'Lt. 3' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setFocusFloor(tab.id)}
                                        className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                                            focusFloor === tab.id
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                            <button
                                type="button"
                                onClick={() => setCameraPreset('iso')}
                                className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                3D
                            </button>
                            <button
                                type="button"
                                onClick={() => setCameraPreset('front')}
                                className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Depan
                            </button>
                            <button
                                type="button"
                                onClick={() => setCameraPreset('top')}
                                className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Atas
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3D Canvas Container */}
                <div className="relative my-3 rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-100 h-[470px]">
                    <div ref={mountRef} className="w-full h-full" />
                    <div className="pointer-events-none absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200/80 text-[10px] font-semibold text-slate-600 shadow-sm">
                        Drag kiri: Putar 360° • Scroll: Zoom • Klik kanan: Geser • Klik blok: Pilih ruangan
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10.5px] text-slate-500">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            {t('rooms.status_available', 'Tersedia')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            {t('rooms.status_booked', 'Terjadwal')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                            {t('rooms.map_selected', 'Dipilih')}
                        </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                        WebGL 3D Interactive • Fakultas Vokasi UB
                    </span>
                </div>
            </div>

            {/* Right Inspector Card */}
            <aside className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
                {selectedRoom ? (
                    <div>
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                            <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-700">
                                {selectedRoom.code}
                            </span>
                            <span
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                    selectedRoom.status === 'booked'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                            >
                                {selectedRoom.status === 'booked'
                                    ? t('rooms.status_booked', 'Terjadwal')
                                    : t('rooms.status_available', 'Tersedia')}
                            </span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 mt-4 leading-snug">
                            {selectedRoom.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-blue-600 mt-1">
                            {selectedRoom.floor} • {selectedRoom.category}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-3">
                            {selectedRoom.description}
                        </p>

                        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                                <Icon name="users" className="w-3.5 h-3.5 text-slate-400" />
                                {t('rooms.capacity', 'Kapasitas:')}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800">
                                {selectedRoom.capacity} {t('rooms.people', 'orang')}
                            </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-[10.5px] font-bold text-slate-700 mb-2">
                                {t('rooms.facilities_label', 'Fasilitas Ruangan')}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedRoom.facilities?.map((facility) => (
                                    <span
                                        key={facility}
                                        className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg"
                                    >
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <a
                        href="/bookings/create"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                    >
                        <Icon name="plus" className="w-4 h-4" />
                        {t('rooms.apply_room', 'Ajukan Ruangan')}
                    </a>
                    <a
                        href="/calendar"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <Icon name="calendar" className="w-4 h-4" />
                        {t('rooms.view_schedule', 'Lihat Jadwal')}
                    </a>
                </div>
            </aside>
        </div>
    );
}
