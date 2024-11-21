import styles from './Chart.module.scss';

function Chart({ data, descr }) {
    const { maxHeightChart, segments } = data;

    return (
        <div className={styles.chart}>
            <div style={{ height: `${maxHeightChart}px` }} className={styles.chartColumn}>
                <div
                    style={{
                        height: segments.front.heightSegment,
                    }}
                    className={`${styles.front} ${styles.columnItem}`}
                >
                    {segments.front.countTest}
                </div>
                <div
                    style={{
                        height: segments.back.heightSegment,
                    }}
                    className={`${styles.back} ${styles.columnItem}`}
                >
                    {segments.back.countTest}
                </div>
                <div
                    style={{
                        height: segments.db.heightSegment,
                    }}
                    className={`${styles.db} ${styles.columnItem}`}
                >
                    {segments.db.countTest}
                </div>
            </div>
            <p className={styles.descrChart}>{descr}</p>
        </div>
    );
}

export default Chart;
