import * as React from 'react';
import { ApiScore } from '../../utils/ApiService';
import RankingTable from '../../components/molecules/RankingTable/RankingTable';

interface RankingProps { 
    ranking: any;
}




const Ranking: React.FC<RankingProps> = ({ ranking }) => { 

    return (
        <>
            <RankingTable rows={ranking} />
        </>

    )

}

export async function getStaticProps() {
    const ranking = await ApiScore.getScore();

    return {
        props: {
            ranking
        }
    }
}

export default Ranking;