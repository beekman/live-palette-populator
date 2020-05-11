const { getHarmonies } = require('../utils/colorUtils');

describe('tests for getHarmonies functions', () => {
  it('should return an empty array for complements of 0', () => {
    const hsl = { h: 180, s: 1, l: 0.5, a: 1 };
    const harmonies = 0;
    expect(getHarmonies(hsl, harmonies)).toEqual([]);
  });

  it('should return 1 color with hue of 0 for 1 harmony and base color with h:180', () => {
    const hsl = { h: 180, s: 1, l: 0.5, a: 1 };
    const harmonies = 1;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 0, s: 1, l: 0.5, a: 1 }]);
  });

  it('should return 2 colors with equidistant hues above and below color with h:180 and 2 harmonies', () => {
    const hsl = { h: 180, s: 1, l: 0.5, a: 1 };
    const harmonies = 2;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 60, s: 1, l: 0.5, a: 1 }, { h: 300, s: 1, l: 0.5, a: 1 }]);
  });
  it('should return 3 colors with equidistant hues for color with h:180 and 3 harmonies', () => {
    const hsl = { h: 180, s: 1, l: 0.5, a: 1 };
    const harmonies = 3;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 90, s: 1, l: 0.5, a: 1 }, { h: 0, s: 1, l: 0.5, a: 1 }, { h: 270, s: 1, l: 0.5, a: 1 }]);
  });


  it('should return color of hue 180 for 1 harmony and a base color with hue of 0', () => {
    const hsl = { h: 0, s: 1, l: 0.5, a: 1 };
    const harmonies = 1;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ 'a': 1, 'h': 180, 'l': 0.5, 's': 1 }]);
  });
  it('should return 2 colors with hues above 0 for 2 harmonies and base hue of 0', () => {
    const hsl = { h: 0, s: 1, l: 0.5, a: 1 };
    const harmonies = 2;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 120, s: 1, l: 0.5, a: 1 },
    { h: 240, s: 1, l: 0.5, a: 1 }]);
  });
  it('should return 3 colors with hues above 0 for 3 harmonies and base hue of 0', () => {
    const hsl = { h: 0, s: 1, l: 0.5, a: 1 };
    const harmonies = 3;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 90, s: 1, l: 0.5, a: 1 },
    { h: 180, s: 1, l: 0.5, a: 1 },
    { h: 270, s: 1, l: 0.5, a: 1 }]);
  });

  it('should return color of hue 179 for 1 harmony and color with base hue of 359', () => {
    const hsl = { h: 359, s: 1, l: 0.5, a: 1 };
    const harmonies = 1;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ 'a': 1, 'h': 179, 'l': 0.5, 's': 1 }]);
  });
  it('should return colors of hues 119 and 239 for 2 harmonies and color with a base hue of 359', () => {
    const hsl = { h: 359, s: 1, l: 0.5, a: 1 };
    const harmonies = 2;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 239, s: 1, l: 0.5, a: 1 },
    { h: 119, s: 1, l: 0.5, a: 1 }]);
  });
  it('should return three colors with hues below 359 for 3 harmonies and color with a base hue of 359', () => {
    const hsl = { h: 359, s: 1, l: 0.5, a: 1 };
    const harmonies = 3;
    expect(getHarmonies(hsl, harmonies)).toEqual([{ h: 269, s: 1, l: 0.5, a: 1 },
    { h: 179, s: 1, l: 0.5, a: 1 },
    { h: 89, s: 1, l: 0.5, a: 1 }]);
  });
});
