import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LivePalette from '../LivePalette/LivePalette';
import styles from '../VariationsControls/VariationsControls.css';
import { getHarmonies } from '../../utils/colorUtils';

const VariationsControls = (color) => {
  const [harmonyQuantity, setHarmonyQuantity] = useState('2');
  const [inverses, setInverses] = useState('0');
  const [lighters, setLighters] = useState('0');
  const [darkers, setDarkers] = useState('0');

  useEffect(() => {
    const hsl = color.hsl;
    getHarmonies(color.hsl, harmonyQuantity);
  });

  return (
    <>
      <section className={styles.ColorMatches}>
      </section>
      <div className={styles.VariationsControls}>
        <label htmlFor="harmonyQuantity">Harmonies</label><input type="number" id="harmonyQuantity" value={harmonyQuantity} onChange={({ target }) => setHarmonyQuantity(target.value)} />
        <label htmlFor="inverse">Inverses</label><input type="number" id="inverses" value={inverses} onChange={({ target }) => setInverses(target.value)} />
        <label htmlFor="lighter">Lighter</label><input type="number" id="lighter" value={lighters} onChange={({ target }) => setLighters(target.value)} />
        <label htmlFor="darker">Darker</label><input type="number" id="darker" value={darkers} onChange={({ target }) => setDarkers(target.value)} />
      </div >
    </>
  );
};

export default VariationsControls;
