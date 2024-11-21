import { useState, useEffect } from 'react';

function useChartHeights(data, maxHeight = 300) {
    const [chartsInfo, setChartsInfo] = useState(null);

    useEffect(() => {
        function calculateHeights() {
            // Суммируем тесты в каждом столбце
            const totals = {
                dev: Object.values(data.dev).reduce((a, b) => a + b, 0),
                test: Object.values(data.test).reduce((a, b) => a + b, 0),
                prod: Object.values(data.prod).reduce((a, b) => a + b, 0),
                norm: data.norm,
            };

            // Находим максимальное количество тестов среди всех столбцов
            const maxTotal = Math.max(...Object.values(totals));

            // Функция для вычисления высоты столбца на основе количества тестов
            function calcHeight(
                chartTests,
                testCount = maxTotal,
                maxHeightValue = maxHeight,
            ) {
                return Math.floor((chartTests / testCount) * maxHeightValue);
            }

            // Функция для создания сегментов
            function createSegments(columnData, columnHeight) {
                return Object.keys(columnData).reduce((acc, segment) => {
                    acc[segment] = {
                        countTest: columnData[segment],
                        heightSegment: calcHeight(columnData[segment], columnHeight),
                    };
                    return acc;
                }, {});
            }

            // Результирующий объект с данными о тестах
            const chartsInfo = {};

            ['dev', 'test', 'prod', 'norm'].forEach((key) => {
                const columnHeight = calcHeight(totals[key]);
                if (key === 'norm') {
                    chartsInfo[key] = {
                        maxHeightChart: columnHeight,
                        countTest: totals[key]
                    };
                } else {
                    chartsInfo[key] = {
                        maxHeightChart: columnHeight,
                        segments: createSegments(data[key], totals[key], columnHeight),
                    };
                }
            });

            setChartsInfo(chartsInfo);
        }

        if (data) {
            calculateHeights();
        }
    }, [data, maxHeight]);

    return chartsInfo;
}

export default useChartHeights;
