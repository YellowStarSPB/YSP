import { useEffect, useMemo, useState } from 'react';
import styles from './DifferenceTests.module.scss';

function DifferenceTests({ nextTests, currentTests, position }) {

    const [isGoodValue, setIsGoodValue] = useState(false);

    const totalTests = useMemo(() => {
        const nextTestsValue = Object.values(nextTests).reduce(
            (sum, value) => sum + value,
            0,
        );
        const currentTestsValue = Object.values(currentTests).reduce(
            (sum, value) => sum + value,
            0,
        );
        return nextTestsValue - currentTestsValue;
    }, [nextTests, currentTests]);

    useEffect(() => {
        setIsGoodValue(totalTests > 0);
    }, [totalTests]);
    
    return (
        <div
            style={position}
            className={`${styles.differenceBlock} ${isGoodValue ? styles.isGood : ''}`}
        >
            <span className={styles.differenceValue}>
                {totalTests > 0 ? `+${totalTests}` : totalTests}
            </span>
        </div>
    );
}

export default DifferenceTests;
