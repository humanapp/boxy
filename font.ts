namespace boxy {
    class Font {
        constructor(
        public charWidth: number,
        public charHeight: number,
        private glyphs: string[]) { }
        public getGlyph(char: number): string {
            char -= 32;
            if (char < 0 || char >= this.glyphs.length)
                return null;
            return this.glyphs[char];
        }
    }

    export const font6 = new Font(6, 5, [
            `..............................`,
            `.#.....#.....#...........#....`,
            `.#.#...#.#....................`,
            `.#.#..#####..#.#..#####..#.#..`,
            `.###..##..#..###..#..##..###..`,
            `##..#.#..#....#....#..#.#..##.`,
            `.##...#..#...##...#..#...##.#.`,
            `.#.....#......................`,
            `..#....#.....#.....#......#...`,
            `.#......#.....#.....#....#....`,
            `.......#.#....#....#.#........`,
            `........#....###....#.........`,
            `....................#....#....`,
            `.............###..............`,
            `...................#..........`,
            `....#....#....#....#....#.....`,
            `.##...#..#..#..#..#..#...##...`,
            `..#....##.....#.....#....###..`,
            `###......#...##...#.....####..`,
            `####.....#....#...#..#...##...`,
            `..##...#.#..#..#..#####....#..`,
            `#####.#.....####......#.####..`,
            `...#....#....###..#...#..###..`,
            `#####....#....#....#....#.....`,
            `.###..#...#..###..#...#..###..`,
            `.###..#...#..###....#....#....`,
            `.......#...........#..........`,
            `........#...........#....#....`,
            `...#....#....#......#......#..`,
            `.......###.........###........`,
            `.#......#......#....#....#....`,
            `.###..#...#...##..........#...`,
            `.###..#...#.#.#.#.#..##..##...`,
            `.##...#..#..####..#..#..#..#..`,
            `###...#..#..###...#..#..###...`,
            `.###..#.....#.....#......###..`,
            `###...#..#..#..#..#..#..###...`,
            `####..#.....###...#.....####..`,
            `####..#.....###...#.....#.....`,
            `.###..#.....#..##.#...#..###..`,
            `#..#..#..#..####..#..#..#..#..`,
            `###....#.....#.....#....###...`,
            `#####....#.....#..#..#...##...`,
            `#..#..#.#...##....#.#...#..#..`,
            `#.....#.....#.....#.....####..`,
            `#...#.##.##.#.#.#.#...#.#...#.`,
            `#...#.##..#.#.#.#.#..##.#...#.`,
            `.##...#..#..#..#..#..#...##...`,
            `###...#..#..###...#.....#.....`,
            `.##...#..#..#..#...##.....##..`,
            `###...#..#..###...#..#..#...#.`,
            `.###..#......##......#..###...`,
            `#####...#.....#.....#.....#...`,
            `#..#..#..#..#..#..#..#...##...`,
            `#...#.#...#.#...#..#.#....#...`,
            `#...#.#...#.#.#.#.##.##.#...#.`,
            `#..#..#..#...##...#..#..#..#..`,
            `#...#..#.#....#.....#.....#...`,
            `####....#....#....#.....####..`,
            `.###...#.....#.....#.....###..`,
            `#......#......#......#......#.`,
            `.###.....#.....#.....#...###..`,
            `..#....#.#....................`,
            `........................#####.`,
            `.#......#.....................`,
            `.......###..#..#..#..#...####.`,
            `#.....#.....###...#..#..###...`,
            `.......###..#.....#......###..`,
            `...#.....#...###..#..#...###..`,
            `.##...#..#..###...#......###..`,
            `..##...#....###....#.....#....`,
            `.###..#..#...###.....#...##...`,
            `#.....#.....###...#..#..#..#..`,
            `.#...........#.....#.....#....`,
            `...#...........#.....#...##...`,
            `#.....#.#...##....#.#...#..#..`,
            `.#.....#.....#.....#......##..`,
            `......##.##.#.#.#.#...#.#...#.`,
            `......###...#..#..#..#..#..#..`,
            `.......##...#..#..#..#...##...`,
            `......###...#..#..###...#.....`,
            `.......###..#..#...###.....#..`,
            `.......###..#.....#.....#.....`,
            `........##...#......#...##....`,
            `.#.....#.....###...#......###.`,
            `......#..#..#..#..#..#...####.`,
            `......#...#.#...#..#.#....#...`,
            `......#...#.#...#.#.#.#.##.##.`,
            `......#..#...##....##...#..#..`,
            `......#...#..#.#....#...##....`,
            `......####....#....#....####..`,
            `..##....#....##.....#.....##..`,
            `.#.....#.....#.....#.....#....`,
            `##.....#.....##....#....##....`,
            `.............##......##.......`,
        ]);
    }