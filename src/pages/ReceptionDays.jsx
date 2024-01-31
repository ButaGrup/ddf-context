import React from 'react';
import '../assets/css/ReceptionDays.css';

const ReceptionDays = () => {
    return (
        <div className="col-12 col-md-8 col-sm-12 reception-days">
            <h1 class="news-title">Qəbul günləri</h1>
            <article class="article-about-top">
                <p><strong>“Daşkəsən Dəmir Filiz</strong><strong></strong><strong>”</strong><strong>&nbsp;Məhdud Məsuliyyətli Cəmiyyətində&nbsp;</strong><strong>vətəndaşların qəbulu</strong></p>
                <p><strong>“Daşkəsən Dəmir Filiz” MMC vətəndaşların təklif və iradlarını nəzərə alaraq fəaliyyətini təkmilləşdirməyə hər zaman hazırdır. Qəbula yazılmaq üçün şəhər telefonları vasitəsilə əlaqə saxlaya və ya mövzuda “qəbul günləri” qeyd edərək info@ddf.az e-poçt ünvanına müraciət edə bilərsiniz.</strong></p>
                <table>
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                            <td><strong>Qəbul saatları</strong></td>
                            <td><strong>Qəbul günləri</strong></td>
                        </tr>
                        <tr>
                            <td>Baş direktor<br />
                            <strong>Ceyhun Əliyev</strong></td>
                            <td style={{textAlign: 'center'}}>14:00 - 16:00&nbsp;</td>
                            <td>Hər ayın 3-cü həftəsinin cümə günü</td>
                        </tr>
                        <tr>
                            <td>Baş direktor müavini<br />
                            <strong>İlqar Cəlilov</strong></td>
                            <td style={{textAlign: 'center'}}>14:00 - 16:00</td>
                            <td>Hər ayın 1-ci və 2-ci həftəsinin cümə günü</td>
                        </tr>
                        <tr>
                            <td>Baş direktor müavini<br />
                            <strong>Mirsadıx Yaqubzadə</strong></td>
                            <td style={{textAlign: 'center'}}>14:00 - 16:00</td>
                            <td>Hər ayın 1-ci və 2-ci həftəsinin cümə günü</td>
                        </tr>
                        <tr>
                            <td>Sahə meneceri <br />
                            <strong>Pərvin Keyqubadi</strong></td>
                            <td style={{textAlign: 'center'}}>14:00 - 16:00</td>
                            <td>Hər həftənin çərşənbə axşamı</td>
                        </tr>   
                    </tbody>
                </table>
                <p>&nbsp;</p>
                <p><strong><em>QEYD:</em></strong></p>
                <p>Qəbul günləri matəm və bayram günlərinə düşdükdə həmin gün qeyri–iş günü sayıldığından qəbul aparılmır.<br />
                Baş direktorun qəbulu yalnız öncədən qeydiyyata alınmış siyahı əsasında aparılır.</p>
            </article>
        </div>
    );
};

export default ReceptionDays;