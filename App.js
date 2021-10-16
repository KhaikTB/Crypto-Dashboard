import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin'

function App()
{
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() =>
  {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
      .then(res =>
      {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleChange = e =>
  {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search Crypto</h1>
        <form>
          <input className='coin-input' onChange={handleChange} type='text' placeholder='Search'/>
        </form>
      </div>

      {filteredCoins.map(coin =>
      {
        return (
          <Coin
            key={coin.id}
            rank={coin.market_cap_rank}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.total_volume}
            ath={coin.ath}
          />
        )
      })}
    </div>
  )
}

export default App;