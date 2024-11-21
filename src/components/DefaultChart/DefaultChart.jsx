import styles from './DefaultChart.module.scss';

function DefaultChart({ value }) {
    return (
        <div className={styles.defaultChart}>
            <div
                style={{ height: value.maxHeightChart }}
                className={styles.defaultChartColumn}
            >
                <p className={styles.defaultChartValue}>{value.countTest}</p>
            </div>
            <p className={styles.descrChart}>норматив</p>
        </div>
    );
}

export default DefaultChart;
