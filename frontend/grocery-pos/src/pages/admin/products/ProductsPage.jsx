import React, { useEffect, useState } from 'react'
import axios from 'axios'
import bannerSVG from './banner.svg'

const ProductsPage = () => {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setProducts([]);
    setSearch('');
    if (selectedCategory !== null) {
      axios.get(`/products/category/${(categories[selectedCategory]?.category).replaceAll(' ', '_')}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    return product.item_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex w-full h-full md:py-[12px]">
      <div className="min-h-full no-scrollbar shadow-[rgba(0,0,15,0.1)_5px_-5px_5px_0px] md:shadow-none md:border-e-2 min-w-[5.7rem] max-w-[5.7rem] md:min-w-[15.8rem] md:max-w-[15.8rem] flex flex-col gap-2 md:pt-1 md:mt-2 pb-2 me-2 fixed md:relative overflow-y-scroll left-0 pt-mobile">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center md:gap-1 hover:md:bg-[#FFF6E9] md:p-2 md:ps-3 cursor-pointer ${selectedCategory === index ? 'md:bg-[#FFF6E9] md:border-s-4 md:border-[#ff9e1f]' : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            <div className={`w-full md:w-fit flex justify-center mobile-customm ${selectedCategory === index ? 'bg-[#FFF6E9]' : ''}`}>
              <img src={require(`../../../assets/products/${category?.sku}.jpg`)} alt="category" className={`min-w-[3.5rem] max-w-[3.5rem] min-h-[3.5rem] max-h-[3.5rem] rounded-full`} />
            </div>
            <span className={`font-medium text-[0.78rem] md:text-[0.88rem] px-2 md:p-2 md:me-3 text-left line-clamp-2 leading-tighter md:leading-normal mobile-centerr ${selectedCategory === index ? 'font-semibold mobile-gloww' : ''}`}>{category?.category}</span>
          </div>
        ))}
      </div>
      <div className="ps-2 md:ms-1 w-full ms-[5.2rem]">
        <input
          type="text"
          className="form-control mt-3 py-2 !font-medium placeholder:!opacity-75"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {
          selectedCategory === null
            ?
            <div className="flex justify-center w-full pt-[1.5rem]">
              <div className="h6 opacity-75 text-center">Select a category to view products</div>
            </div>
            :
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-4">
              {
                (filteredProducts)?.map((product, index) => (
                  <div key={index} className="aspect-[15/28] w-full md:p-1.5 group flex flex-col">
                    <div className="aspect-square bg-white rounded-2xl overflow-clip border relative">
                      <img src={require(`../../../assets/products/${product?.item_sku}.jpg`)} alt={product.item_name} className='w-full h-full aspect-square object-contain bg-white transition  group-hover:scale-[110%]' />
                      {product.item_mrp - product.item_price > 0 &&
                        <div className="absolute top-0 right-[0.3rem] font-semibold text-white text-center leading-[1.16] text-[0.65rem] w-[35px]">
                          <img src={bannerSVG} alt="offer" className="absolute w-[35px] z-[10]" />
                          <span className='!z-[20] relative top-[3.5px]'>
                            {Math.round((product.item_mrp - product.item_price) * 100 / product.item_mrp)}%<br></br>OFF
                          </span>
                        </div>
                      }
                    </div>
                    <div className="font-medium text-[0.88rem] leading-[1.18rem] mt-[8px] tracking-wide line-clamp-2 h-[2.4rem]">{product.item_name}</div>
                    <div className="font-normal text-[0.82rem] leading-[1.2rem] mt-0.5 tracking-wide line-clamp-2">{product.item_qty} pieces left</div>
                    <div className="mt-auto font-semibold mb-1">
                      ₹{product.item_price}
                      <span className="ms-[5px] text-[0.8rem] line-through font-medium opacity-75">₹{product.item_mrp}</span>
                    </div>
                    <button className="border-[#ff3269] border-[1.5px] p-1.5 rounded font-semibold text-[0.8rem] text-[#ff3269] mb-2">Edit</button>
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}

export default ProductsPage