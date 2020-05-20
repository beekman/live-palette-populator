import React, { useEffect, useState } from 'react';
import styles from './VariationsControls.css';
import { getHarmonies, getOppositeDegree, getInverses, getBaseHarmoniesAndInversesColorList, getLighters, getDarkers, getDesaturateds, hslToRgb } from '../../utils/colorUtils';
import { MdInvertColors, MdBrightnessLow, MdFormatColorReset } from 'react-icons/md';
import { IoIosColorFilter } from 'react-icons/io';
import { TiAdjustBrightness } from 'react-icons/ti';

const VariationsControls = (color) => {

  const [harmonyQuantity, setHarmonyQuantity] = useState('0');
  const [inverseQuantity, setInverseQuantity] = useState('0');
  const [inverseMax, setInverseMax] = useState('1');
  const [lighterQuantity, setLighterQuantity] = useState('0');
  const [darkerQuantity, setDarkerQuantity] = useState('0');
  const [desaturatedQuantity, setDesaturatedQuantity] = useState('0');
  const [darkMode, setDarkMode] = useState(true);
  const [swatchToggled, setSwatchToggled] = useState(true);
  const handleSwatchClick = () => setSwatchToggled((toggled) => !toggled);


  useEffect(() => {
    setInverseMax(harmonyQuantity + 1);
    const hslHarmonies = getHarmonies(color.color, harmonyQuantity);
    makeColorSwatches(hslHarmonies);
    let postcssHarmonies = makePostcssValuesVariables(hslHarmonies);
    console.log(postcssHarmonies);
    const hslInverses = getInverses(color.color, hslHarmonies, inverseQuantity);
    makeColorSwatches(hslInverses);

    baseHarmoniesAndInversesColorList = getBaseHarmoniesAndInversesColorList(color.color, hslHarmonies, hslInverses);
    hslLighters = getLighters(baseHarmoniesAndInversesColorList, lighterQuantity);
    makeColorSwatches(hslLighters);
    hslDarkers = getDarkers(baseHarmoniesAndInversesColorList, darkerQuantity);
    makeColorSwatches(hslDarkers);
    hslDesaturateds = getDesaturateds(baseHarmoniesAndInversesColorList, desaturatedQuantity);
    makeColorSwatches(hslDesaturateds);
  });

  let hslHarmonies = getHarmonies(color.color, harmonyQuantity);

  let hslInverses = getInverses(color.color, hslHarmonies, inverseQuantity);
  let baseHarmoniesAndInversesColorList = getBaseHarmoniesAndInversesColorList(color.color, hslHarmonies, hslInverses);
  let hslLighters = getLighters(baseHarmoniesAndInversesColorList, lighterQuantity);
  let hslDarkers = getDarkers(baseHarmoniesAndInversesColorList, darkerQuantity);
  let hslDesaturateds = getDesaturateds(baseHarmoniesAndInversesColorList, desaturatedQuantity);


  const makeColorSwatches = (colorSet) => {
    if(colorSet.length) {
      return colorSet.map((color, i) => {
        let key = (color.matchType + (Number(i) + 1));
        return (
          <div key={key} style={{ background: `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)` }} className={styles.Swatch} onClick={handleSwatchClick}>
            <aside className={`${styles.details} ${swatchToggled && styles.hidden}`}>
              hsl({(color.h).toFixed(0)}, {(color.s * 100).toFixed(2)}%, {(color.l * 100).toFixed(2)}%)
            </aside>
          </div>
        );
      });
    }
  };

  const makePostcssValuesVariables = (colorSet) => {
    let postCSSstyles = '';
    if(colorSet.length > 0) {
      colorSet.map((color, i) => {
        let colorLabel = (color.matchType + (Number(i) + 1));
        let line = `${colorLabel}: hsl(${(color.h).toFixed(0)}, ${(color.s * 100).toFixed(2)}%, ${(color.l * 100).toFixed(2)}%)`;
        postCSSstyles.concat(line);
      });
    }
    console.log(postCSSstyles);
    return postCSSstyles;
  };

  let harmonySwatches = makeColorSwatches(hslHarmonies);
  let inverseSwatches = makeColorSwatches(hslInverses);
  let lighterSwatches = makeColorSwatches(hslLighters);
  let darkerSwatches = makeColorSwatches(hslDarkers);
  let desaturatedSwatches = makeColorSwatches(hslDesaturateds);

  return (
    <>
      <div className={styles.VariationsControls} style={{ background: `hsl(${(color.color.h)}, ${color.color.s * 100}%, ${color.color.l * 150}%)`, borderWidth: '2px', borderColor: `hsl(${(getOppositeDegree(color.color.h))}, ${color.color.s * 100}%, ${color.color.l * 100}%)`, borderStyle: 'solid' }}>
        <label htmlFor="harmonyQuantity" title="Complementary colors to generate, evenly spaced around the color wheel. 2 will give you a split complementary triad scheme, 3 will return a color from each quarter of the color wheel."><IoIosColorFilter />Harmonies</label><input type="number" id="harmonyQuantity" value={harmonyQuantity} min="0" max="9" onChange={({ target }) => setHarmonyQuantity(target.value)} />
        <label htmlFor="inverseQuantity" title="Colors opposite from the base & harmonic colors on the color wheel. First color is inverted base, subsequent colors are inverted harmonies."><MdInvertColors />Inverses</label><input type="number" id="inverseQuantity" min="0" max={inverseMax} value={inverseQuantity} onChange={({ target }) => setInverseQuantity(target.value)} />
        <label htmlFor="lighterQuantity" title="Lighter color sets to generate from the base, harmonies, and inverses, with each increment stepping closer to white."><MdBrightnessLow />Brighter &times;<input type="number" id="lighterQuantity" value={lighterQuantity} onChange={({ target }) => setLighterQuantity(target.value)} /></label>
        <label htmlFor="darkerQuantity" title="Darker color sets to generate from the base, harmonies, and inverses,with each increment stepping closer to black."> <TiAdjustBrightness />Darker &times;<input type="number" id="darkerQuantity" min="0" max="9" value={darkerQuantity} onChange={({ target }) => setDarkerQuantity(target.value)} /></label>
        <label htmlFor="desaturatedQuantity" title="Less saturated color sets to generate from the base, harmonies, and inverses, with each increment stepping closer to grayscale."><MdFormatColorReset />Desaturated &times;<input type="number" id="desaturatedQuantity" value={desaturatedQuantity} min="0" max="9" onChange={({ target }) => setDesaturatedQuantity(target.value)} /></label>
      </div>

      <section className={styles.ColorMatches}>
        {harmonySwatches}
        {inverseSwatches}
        {lighterSwatches}
        {darkerSwatches}
        {desaturatedSwatches}
      </section>
      <section className={styles.export}>
        <textarea className={styles.cssOutputText} />
      </section>
    </>
  );
};

export default VariationsControls;
