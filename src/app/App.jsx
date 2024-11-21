import { useEffect, useState } from 'react';
import Chart from '../components/Chart/Chart';
import DefaultChart from '../components/DefaultChart/DefaultChart';
import DifferenceTests from '../components/DifferenceTests/DifferenceTests';
import useChartHeights from '../hooks/useChartHeights';

const chartsInfo = [
    {
        color: 'var(--blue)',
        text: 'Клиентская часть',
    },
    {
        color: 'var(--purple)',
        text: 'Серверная часть',
    },
    {
        color: 'var(--pink)',
        text: 'База данных',
    },
];

function App() {
    const [dataTest, setDataTests] = useState(null);
    const chartsData = useChartHeights(dataTest);

    useEffect(() => {
        const getTests = async () => {
            try {
                const data = await fetch('https://rcslabs.ru/ttrp1.json');
                if (!data.ok) {
                    throw new Error('Что-то пошло не так');
                }
                const tests = await data.json();
                setDataTests(tests);
            } catch (error) {
                console.log(error);
            }
        };

        getTests();
    }, []);

    return (
        <main className="container">
            <div className="сharts">
                {!chartsData ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1 className="сharts__title">
                            Количество пройденных тестов "{dataTest.title}"
                        </h1>
                        <div className="сharts__content">
                            <Chart data={chartsData.dev} descr="dev" />

                            <DifferenceTests
                                currentTests={dataTest.dev}
                                nextTests={dataTest.test}
                                position={{ top: '-71px', left: '8%' }}
                            />
                            <Chart data={chartsData.test} descr="test" />

                            <DifferenceTests
                                currentTests={dataTest.test}
                                nextTests={dataTest.prod}
                                position={{ top: '-71px', left: '35%' }}
                            />

                            <Chart data={chartsData.prod} descr="prod" />

                            <DefaultChart value={chartsData.norm} />
                        </div>
                        <div className="сharts__info">
                            {chartsInfo.map(({ color, text }, index) => (
                                <p key={index} className="сharts__info-item">
                                    <span
                                        style={{ background: color }}
                                        className="сharts__info-item-icon"
                                    ></span>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default App;
