import React, { useEffect, useState } from 'react';
import styles from './VariationsControls.css';
import {
  isGrayscale, isDark,
  getHarmonies, getOppositeDegree,
  getInverses, getBaseHarmoniesAndInversesColorList,
  getLighters, getDarkers, getDesaturateds
} from '../../utils/colorUtils';
import { getPostcssValuesVariables, getCssClasses } from '../../utils/styleExporters';
import { hslToRgb, hslToObject } from '../../utils/colorConverters';
import { createPopper } from '@popperjs/core';

import { MdInvertColors, MdBrightnessLow, MdFormatColorReset } from 'react-icons/md';
import { IoIosColorFilter } from 'react-icons/io';
import { TiAdjustBrightness } from 'react-icons/ti';


const VariationsControls = (color) => {
  const [harmonyQuantity, setHarmonyQuantity] = useState(0);
  const [inverseQuantity, setInverseQuantity] = useState(0);
  const [inverseMax, setInverseMax] = useState(1);
  const [lighterQuantity, setLighterQuantity] = useState(0);
  const [darkerQuantity, setDarkerQuantity] = useState(0);
  const [desaturatedQuantity, setDesaturatedQuantity] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [swatchToggled, setSwatchToggled] = useState(true);
  const handleSwatchClick = () => setSwatchToggled((toggled) => !toggled);
  const [postcssExportText, setPostcssExportText] = useState('base: hsl(0, 100%, 50%);');
  const [cssExportText, setCssExportText] = useState('.base{\nhsl(0, 100%, 50%);\n}');

  useEffect(() => {
    setInverseMax(Number(harmonyQuantity) + 1);
    const hslHarmonies = getHarmonies(color.color, harmonyQuantity);
    const hslInverses = getInverses(color.color, hslHarmonies, inverseQuantity);
    baseHarmoniesAndInversesColorList = getBaseHarmoniesAndInversesColorList(color.color, hslHarmonies, hslInverses);
    hslLighters = getLighters(baseHarmoniesAndInversesColorList, lighterQuantity);
    hslDarkers = getDarkers(baseHarmoniesAndInversesColorList, darkerQuantity);
    hslDesaturateds = getDesaturateds(baseHarmoniesAndInversesColorList, desaturatedQuantity);
    const postcssValuesVariables = (getPostcssValuesVariables(hslHarmonies)) + (getPostcssValuesVariables(hslInverses)) + (getPostcssValuesVariables(hslLighters)) + (getPostcssValuesVariables(hslDarkers)) + (getPostcssValuesVariables(hslDesaturateds));
    const cssClasses = (getCssClasses(color.color)) + (getCssClasses(hslHarmonies)) + (getCssClasses(hslInverses)) + (getCssClasses(hslLighters)) + (getCssClasses(hslDarkers)) + (getCssClasses(hslDesaturateds));

    makeColorSwatches(hslHarmonies);
    makeColorSwatches(hslInverses);
    makeColorSwatches(hslLighters);
    makeColorSwatches(hslDarkers);
    makeColorSwatches(hslDesaturateds);
    setPostcssExportText(postcssValuesVariables);
    setCssExportText(cssClasses);
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
             <strong>{(color.matchType)}</strong> hsl({(color.h).toFixed(0)}, {(color.s * 100).toFixed(2)}%, {(color.l * 100).toFixed(2)}%)
            </aside>
          </div>
        );
      });
    }
  };


  let harmonySwatches = makeColorSwatches(hslHarmonies);
  let inverseSwatches = makeColorSwatches(hslInverses);
  let lighterSwatches = makeColorSwatches(hslLighters);
  let darkerSwatches = makeColorSwatches(hslDarkers);
  let desaturatedSwatches = makeColorSwatches(hslDesaturateds);

  return (
    <>
      <div className={styles.VariationsControls} style={{ background: `hsl(${(color.color.h)}, ${color.color.s * 100}%, ${color.color.l * 150}%)`, borderWidth: '2px', borderColor: `hsl(${(getOppositeDegree(color.color.h))}, ${color.color.s * 100}%, ${color.color.l * 100}%)`, borderStyle: 'solid' }}>
        <label htmlFor="harmonyQuantity" title="Complementary colors, evenly spaced around the color wheel, relative to the base hue. 2 will give you a split complementary triad scheme, 3 will return a color from each quarter of the color wheel."><IoIosColorFilter /><span className={styles.textLabel}>Harmonies</span></label><input type="number" id="harmonyQuantity" value={harmonyQuantity} min="0" max="36" onChange={({ target }) => setHarmonyQuantity(target.value)} />
        <label htmlFor="inverseQuantity" title="Colors opposite from the base & harmonic colors on the color wheel. First color is inverted base, subsequent colors are inverted harmonies."><MdInvertColors /><span className={styles.textLabel}>Inverses</span></label><input type="number" id="inverseQuantity" min="0" max={inverseMax} value={inverseQuantity} onChange={({ target }) => setInverseQuantity(target.value)} />
        <label htmlFor="lighterQuantity" title="Lighter color sets to generate from the base, harmonies, and inverses, with each increment stepping closer to white."><MdBrightnessLow /><span className={styles.textLabel}>Lighter</span> &times;<input type="number" id="lighterQuantity" value={lighterQuantity} min="0" max="20" onChange={({ target }) => setLighterQuantity(target.value)} /></label>
        <label htmlFor="darkerQuantity" title="Darker color sets to generate from the base, harmonies, and inverses,with each increment stepping closer to black."> <TiAdjustBrightness /><span className={styles.textLabel}>Darker</span> &times;<input type="number" id="darkerQuantity" min="0" max="20" value={darkerQuantity} onChange={({ target }) => setDarkerQuantity(target.value)} /></label>
        <label htmlFor="desaturatedQuantity" title="Less saturated color sets to generate from the base, harmonies, and inverses, with each increment stepping closer to grayscale."><MdFormatColorReset /><span className={styles.textLabel}>Desaturated</span> &times;<input type="number" id="desaturatedQuantity" value={desaturatedQuantity} min="0" max="20" onChange={({ target }) => setDesaturatedQuantity(target.value)} /></label>
      </div>

      <section className={styles.ColorMatches}>
        {harmonySwatches}
        {inverseSwatches}
        {lighterSwatches}
        {darkerSwatches}
        {desaturatedSwatches}
      </section>
      <section className={styles.export}>
        <h2>Palette Export Options</h2>
        <h3><a href="https://github.com/css-modules/css-modules/blob/master/docs/values-variables.md" target="_blank">PostCSS Values Variables</a> color list</h3>
        <textarea className={styles.cssOutputText} value={postcssExportText} onChange={({ postcssValuesVariables }) => setPostcssExportText(postcssValuesVariables)} />
        <h3>CSS stylesheet</h3>
        <textarea className={styles.cssOutputText} value={cssExportText} onChange={({ cssClasses }) => setCssExportText(cssClasses)} />
      </section>
    </>
  );
};

export default VariationsControls;
