namespace boxy {
    class Particle {
        pos: Vec;
        vel: Vec;
        color: Color;
        ticks: number;
    };

    let particles: Particle[];
    const random = new Random();

    export function init() {
        particles = [];
    }

    export function add(
        pos: Vec,
        count = 16,
        speed = 1,
        angle = 0,
        angleWidth = Math.PI * 2
    ) {
        if (count < 1) {
            if (random.get() > count) {
                return;
            }
            count = 1;
        }
        const color = getCurrentColor();
        for (let i = 0; i < count; i++) {
            const a = angle + random.get(angleWidth) - angleWidth / 2;
            const p: Particle = {
                pos: new Vec(pos),
                vel: new Vec(speed * random.get(0.5, 1), 0).rotate(a),
                color: color,
                ticks: clamp(random.get(10, 20) * Math.sqrt(Math.abs(speed)), 10, 60),
            };
            particles.push(p);
        }
    }

    export function update() {
        const color = getCurrentColor();
        particles = particles.filter((p) => {
            p.ticks--;
            if (p.ticks < 0) {
                return false;
            }
            p.pos.add(p.vel);
            p.vel.mul(0.98);
            setCurrentColor(p.color);
            render.rect(Math.floor(p.pos.x), Math.floor(p.pos.y), 1, 1);
            return true;
        });
        setCurrentColor(color);
    }
}
