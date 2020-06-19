import React, { useEffect, useState } from 'react';
import styles from './VariationsControls.css';
import {
  getBaseAndHarmonies, getAnalogousColors, getOppositeDegree,
  getInverses, getBaseHarmoniesInverseAndAnalogousColorList,
  getLighters, getDarkers, getDesaturateds
} from '../../utils/colorUtils';
import {
  hslToRgb, hslToHex, hslToObject
} from '../../utils/colorConverters';
import { MdInvertColors, MdBrightnessLow, MdFormatColorReset, MdLinearScale } from 'react-icons/md';
import { IoIosColorFilter } from 'react-icons/io';
import { TiAdjustBrightness } from 'react-icons/ti';
import { DarkModeToggle } from '../DarkModeToggle';
import useDarkMode from 'use-dark-mode';

const VariationsControls = (color) => {

  const [harmonyQuantity, setHarmonyQuantity] = useState(0);
  const [inverseQuantity, setInverseQuantity] = useState(0);
  const [inverseMax, setInverseMax] = useState(1);
  const [analogousQuantity, setAnalogousQuantity] = useState(0);
  const [lighterQuantity, setLighterQuantity] = useState(0);
  const [darkerQuantity, setDarkerQuantity] = useState(0);
  const [desaturatedQuantity, setDesaturatedQuantity] = useState(0);
  const [swatchToggled, setSwatchToggled] = useState(false);
  const [postcssExportText, setPostcssExportText] = useState('');
  const [cssExportText, setCssExportText] = useState('');
  const [cssExportToggled, setCssExportToggled] = useState(true);
  const [postcssExportToggled, setPostcssExportToggled] = useState(true);
  const [exportHexToggled, setExportHexToggled] = useState(true);
  const [exportRgbToggled, setExportRgbToggled] = useState(false);
  const [exportHslToggled, setExportHslToggled] = useState(false);
  const handleShowColorsClick = () => setSwatchToggled((toggled) => !toggled);
  const handleSwatchClick = () => setSwatchToggled((toggled) => !toggled);
  const handleExportHexClick = () => setExportHexToggled((toggled) => !toggled);
  const handleExportRgbClick = () => setExportRgbToggled((toggled) => !toggled);
  const handleExportHslClick = () => setExportHslToggled((toggled) => !toggled);
  const handleCssExportClick = () => setCssExportToggled((toggled) => !toggled);
  const handlePostcssExportClick = () => setPostcssExportToggled((toggled) => !toggled);
  const darkMode = useDarkMode(false);

  useEffect(() => {
    const backgroundColor = `${(darkMode.value ? '#000000' : '#FFFFFF')}`;
    const foregroundColor = `${(darkMode.value ? '#FFFFFF' : '#000000')}`;
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = foregroundColor;
    setInverseMax(Number(harmonyQuantity) + 1);
    const hslHarmonies = getBaseAndHarmonies(color.color, harmonyQuantity);
    const hslInverses = getInverses(color.color, hslHarmonies, inverseQuantity);
    const hslAnalogousColors = getAnalogousColors(color.color, analogousQuantity);
    baseHarmoniesInverseAndAnalogousColorList = getBaseHarmoniesInverseAndAnalogousColorList(color.color, hslHarmonies, hslInverses, hslAnalogousColors);
    hslLighters = getLighters(baseHarmoniesInverseAndAnalogousColorList, lighterQuantity);
    hslDarkers = getDarkers(baseHarmoniesInverseAndAnalogousColorList, darkerQuantity);
    hslDesaturateds = getDesaturateds(baseHarmoniesInverseAndAnalogousColorList, desaturatedQuantity);


    const postcssValuesVariables = ((getPostcssValuesVariables(hslHarmonies, exportHexToggled, exportHslToggled, exportRgbToggled))) + (((getPostcssValuesVariables(hslInverses, exportHexToggled, exportHslToggled, exportRgbToggled)))) + ((getPostcssValuesVariables(hslLighters, exportHexToggled, exportHslToggled, exportRgbToggled))) + ((getPostcssValuesVariables(hslDarkers, exportHexToggled, exportHslToggled, exportRgbToggled))) + ((getPostcssValuesVariables(hslDesaturateds, exportHexToggled, exportHslToggled, exportRgbToggled)));

    const cssClasses = (getCssClasses(color.color, exportHexToggled, exportHslToggled, exportRgbToggled)) + (getCssClasses(hslHarmonies, exportHexToggled, exportHslToggled, exportRgbToggled)) + (getCssClasses(hslInverses, exportHexToggled, exportHslToggled, exportRgbToggled)) + (getCssClasses(hslLighters, exportHexToggled, exportHslToggled, exportRgbToggled)) + (getCssClasses(hslDarkers, exportHexToggled, exportHslToggled, exportRgbToggled)) + (getCssClasses(hslDarkers, exportHexToggled, exportHslToggled, exportRgbToggled));

    makeColorSwatches(hslHarmonies);
    makeColorSwatches(hslInverses);
    makeColorSwatches(hslAnalogousColors);
    makeColorSwatches(hslLighters);
    makeColorSwatches(hslDarkers);
    makeColorSwatches(hslDesaturateds);
    setPostcssExportText(postcssValuesVariables);
    setCssExportText(cssClasses);
  });

  let hslHarmonies = getBaseAndHarmonies(color.color, harmonyQuantity);
  let hslInverses = getInverses(color.color, hslHarmonies, inverseQuantity);
  let hslAnalogousColors = getAnalogousColors(color.color, analogousQuantity);
  let baseHarmoniesInverseAndAnalogousColorList = getBaseHarmoniesInverseAndAnalogousColorList(color.color, hslHarmonies, hslInverses, hslAnalogousColors);
  let hslLighters = getLighters(baseHarmoniesInverseAndAnalogousColorList, lighterQuantity);
  let hslDarkers = getDarkers(baseHarmoniesInverseAndAnalogousColorList, darkerQuantity);
  let hslDesaturateds = getDesaturateds(baseHarmoniesInverseAndAnalogousColorList, desaturatedQuantity);

  const makeColorSwatches = (colorSet) => {
    if(colorSet.length) {
      return colorSet.map((color, i) => {
        const key = (color.matchType + (Number(i) + 1));
        const rgb = hslToRgb(color.h, color.s, color.l);
        const rgbString = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        const hex = hslToHex(color.h, color.s, color.l);

        return (
          <div key={key} style={{ background: `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)` }} className={styles.Swatch} onClick={handleSwatchClick}>
            <aside className={`${styles.details} ${swatchToggled && styles.hidden}`}>
              <strong>{(color.matchType)}</strong>
              {exportHexToggled &&
                <p className={`${styles.hexValues}`}>{hex}</p>
              }
              {exportRgbToggled &&
                <p className={`${styles.rgbValues}`}>{rgbString}</p>
              }
              {exportHslToggled &&
                <p className={`${styles.hslValues}`}>hsl({(color.h).toFixed(1)}, {(color.s * 100).toFixed(2)}%, {(color.l * 100).toFixed(2)}%)
                </p>
              }
            </aside>
          </div>
        );
      });
    }
  };

  let harmonySwatches = makeColorSwatches(hslHarmonies);
  let inverseSwatches = makeColorSwatches(hslInverses);
  let analogousSwatches = makeColorSwatches(hslAnalogousColors);
  let lighterSwatches = makeColorSwatches(hslLighters);
  let darkerSwatches = makeColorSwatches(hslDarkers);
  let desaturatedSwatches = makeColorSwatches(hslDesaturateds);

  const getPostcssValuesVariables = (colorSet, exportHexToggled, exportHslToggled, exportRgbToggled) => {
    let postCSSVariables = '';
    if(colorSet.length > 0) {
      colorSet.map((color) => {
        const key = (color.matchType);
        let colorString = hslToHex(color.h, color.s, color.l);
        if(exportHslToggled) {
          colorString = ('hsl(' + color.h.toFixed(0) + ', ' + (color.s * 100).toFixed(2) + '%, ' + ((color.l * 100).toFixed(2)) + '%) ;');
        }
        if(exportRgbToggled) {
          const rgb = hslToRgb(color.h, color.s, color.l);
          const r = rgb[0];
          const g = rgb[1];
          const b = rgb[2];
          colorString = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        if(exportHexToggled) {
          colorString = hslToHex(color.h, color.s, color.l);
        }
        const line = `@value ${key}: ${colorString}\n`;
        postCSSVariables += line;
      });
    }
    return postCSSVariables;
  };

  const getCssClasses = (colorSet, exportHexToggled, exportHslToggled, exportRgbToggled) => {
    let cssStyles = '';
    if(colorSet.length > 0) {
      colorSet.map((color) => {
        const key = color.matchType;
        let colorString = hslToHex(color.h, color.s, color.l);
        if(exportHslToggled) {
          colorString = ('hsl(' + color.h.toFixed(0) + ', ' + (color.s * 100).toFixed(2) + '%, ' + ((color.l * 100).toFixed(2)) + '%)');
        }
        if(exportRgbToggled) {
          const rgb = hslToRgb(color.h, color.s, color.l);
          const r = rgb[0];
          const g = rgb[1];
          const b = rgb[2];
          colorString = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        if(exportHexToggled) {
          colorString = hslToHex(color.h, color.s, color.l);
        }
        let line = `.${key}-color {\n\tcolor: ${colorString}; \n}\n`;
        line = line + `.${key}-bg {\n\tbackground-color: ${colorString}; \n}\n`;
        line = line + `.${key}-border {\n\tborder-color: ${colorString}; \n}\n\n`;
        cssStyles += line;
      });
    }
    return cssStyles;
  };


  return (
    <>
      <div className={styles.VariationsControls} style={{ background: `hsl(${(color.color.h)}, ${color.color.s * 100}%, ${color.color.l * 150}%)` }}>
        <label htmlFor="harmonyQuantity" title="Complementary colors, evenly spaced around the color wheel, relative to the base hue. 2 will give you a split complementary triad scheme, 3 will return a color from each quarter of the color wheel."><IoIosColorFilter /><span className={styles.textLabel}>Harmonies</span></label><input type="number" id="harmonyQuantity" value={harmonyQuantity} min="0" max="36" onChange={({ target }) => setHarmonyQuantity(target.value)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#FFFFFF' : '#111')}` }} />
        <label htmlFor="inverseQuantity" title="Colors opposite from the base & harmonic colors on the color wheel. First color is inverted base, subsequent colors are inverted harmonies."><MdInvertColors /><span className={styles.textLabel}>Inverses</span></label><input type="number" id="inverseQuantity" min="0" max={inverseMax} value={inverseQuantity} onChange={({ target }) => setInverseQuantity(target.value)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#FFF' : '#111')}` }} />
        <label htmlFor="analogousQuantity" title="Colors similar in hue to the base color. Each color is 30 degrees away from the base color or nearest analogous color."><MdLinearScale /><span className={styles.textLabel}>Analogous</span></label><input type="number" id="analogousQuantity" min="0" max="12" value={analogousQuantity} onChange={({ target }) => setAnalogousQuantity(target.value)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#FFF' : '#111')}` }} />
        <label htmlFor="lighterQuantity" title="Lighter color sets to generate from the base, harmonies, and inverses, with each increment stepping closer to white."><MdBrightnessLow /><span className={styles.textLabel}>Lighter</span> &times;<input type="number" id="lighterQuantity" value={lighterQuantity} min="0" max="20" onChange={({ target }) => setLighterQuantity(target.value)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#FFF' : '#111')}` }} /></label>
        <label htmlFor="darkerQuantity" title="Darker color sets to generate from the base, harmonies, and inverses,with each increment stepping closer to black."> <TiAdjustBrightness /><span className={styles.textLabel}>Darker</span> &times;<input type="number" id="darkerQuantity" min="0" max="20" value={darkerQuantity} onChange={({ target }) => setDarkerQuantity(target.value)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#FFF' : '#111')}` }} /></label>
        <label htmlFor="desaturatedQuantity" title="Less saturated color sets to generate from the base, harmonies, and inverses, with each increment stepping closer to grayscale."><MdFormatColorReset /><span className={styles.textLabel}>Desaturated</span> &times;<input type="number" id="desaturatedQuantity" value={desaturatedQuantity} min="0" max="20" onChange={({ target }) => setDesaturatedQuantity(target.value)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#FFF' : '#111')}` }} /></label>
      </div>
      <section className={styles.colorFormats} style={{ borderColor: `hsl(${(getOppositeDegree(color.color.h))}, ${color.color.s * 100}%, ${color.color.l * 25}%)`, borderWidth: '0 2px 2px', background: `hsl(${(getOppositeDegree(color.color.h))}, ${color.color.s * 100}%, ${color.color.l * 50}%)`, borderStyle: 'solid' }}>
        <div className={`${styles.exportFormatToggle} ${(!swatchToggled) && styles.toggled}`} onClick={handleShowColorsClick}>View Colors As:</div>
        <div className={`${styles.exportFormatToggle} ${exportHexToggled && styles.toggled}`} onClick={handleExportHexClick}>Hex</div>
        <div className={`${styles.exportFormatToggle} ${exportRgbToggled && styles.toggled}`} onClick={handleExportRgbClick}>RGB</div>
        <div className={`${styles.exportFormatToggle} ${exportHslToggled && styles.toggled}`} onClick={handleExportHslClick}>HSL</div>
        <DarkModeToggle />
      </section>

      <section className={styles.ColorMatches}>
        {harmonySwatches}
        {inverseSwatches}
        {analogousSwatches}
        {lighterSwatches}
        {darkerSwatches}
        {desaturatedSwatches}
      </section>

      <section className={styles.export}>
        <h2>Palette Export Options</h2>
        <h3 className={`${styles.postcssExportToggler} ${postcssExportToggled && styles.expandable}`} onClick={handlePostcssExportClick}>PostCSS Values Variables color list<a href="https://github.com/css-modules/css-modules/blob/master/docs/values-variables.md" target="_blank">*</a></h3>
        <textarea className={`${styles.postcssOutputText} ${postcssExportToggled && styles.hidden}`} value={postcssExportText} onChange={({ postcssValuesVariables }) => setPostcssExportText(postcssValuesVariables)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#EEE' : '#111')}` }} />
        <h3 className={`${styles.cssExportToggler} ${cssExportToggled && styles.expandable}`} onClick={handleCssExportClick}>CSS stylesheet</h3>
        <textarea className={`${styles.cssOutputText} ${cssExportToggled && styles.hidden}`} value={cssExportText} onChange={({ cssClasses }) => setCssExportText(cssClasses)} style={{ background: `${(darkMode.value ? '#111' : '#FFF')}`, color: `${(darkMode.value ? '#EEE' : '#111')}` }} />
      </section>


    </>
  );
};

export default VariationsControls;
