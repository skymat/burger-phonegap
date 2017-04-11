class BasketElement extends React.Component {

  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteClick() {
    console.log("Delete BasketElement");
    this.props.deleteClick(this.props.index);
    //this.props.productSelected.splice(this.index,1);
    this.forceUpdate();
  }
  
  render() {
    return (
      <div>{this.props.product.name}  {this.props.index} <i index={this.props.index} onClick={this.deleteClick} className="fa fa-times-circle" aria-hidden="true"></i></div>
      );
  }
}

class Card extends React.Component {

  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this);
  }
  
  deleteClick(index) { 
    console.log("Delete Card", index);
    this.props.deleteClick(index);
    this.forceUpdate();
  }

  render() {
    var total = 0;
    for(var i=0; i<this.props.productSelected.length;i++)
    {
      total+=parseInt(this.props.productSelected[i].price);
    }
    return (
      <div>
      <header>
      Panier ({this.props.productSelected.length})  - Total : {total} €   
      </header>
      <p>
      {this.props.productSelected.map(function(product, index){
      return <BasketElement index={index}
        product={product} 
        deleteClick={this.deleteClick}
      />;
      }, this)}      
      </p>
      </div>
    );
  }
}


class ProductRow extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      quantity: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.index = props.index;
  }

  handleClick() {
    this.setState({quantity: this.state.quantity+1});
    this.props.fonctionClick(this.index);
  }
  
  
  render() {

    return (
      <li onClick={this.handleClick}>
      <img src={this.props.product.image} />
      <h3>{this.props.product.name}</h3>
      <p>{this.props.product.desc}</p>
      <span>{this.props.product.price}</span>
      <span>({this.state.quantity})</span>
      </li>
    );
  }
}

class ProductTable extends React.Component {

  constructor() {
    super();

  }

  render() {
      
    return (
      <div>
      <h3>{this.props.title}</h3>
      <ul>
      {this.props.products.map(function(product, index){
       return <ProductRow index={index}
              product={product} 
              fonctionClick={this.props.fonctionClick}
              />;
      }, this)}
      </ul>
      </div>
    );
  }
}


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      productSelected: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }
  
  handleClick(index) {
    var p = this.state.productSelected;
    p.push(PRODUCTS[index]);
    this.setState({ productSelected : p });
  }
  
  deleteClick(index){
    console.log("Delete App",index);
    var p = this.state.productSelected;
    p.splice(index,1);
    
    console.log(p.length);
    this.setState({ productSelected : p });
  }
  
  render() {
    return (
      <div>
      <Card productSelected={this.state.productSelected} 
          deleteClick={this.deleteClick}/>
        <ProductTable 
          products={this.props.products}
          title={this.props.title}
          fonctionClick={this.handleClick}
        />
      </div>
    );
  }
}



var PRODUCTS = [
  {image: 'https://lacapsule.academy/wks2/burger_1.png', price: '11€', name: 'Le New-yorker', desc:'Burger de boeuf limousin, cheddar, oignons rings, roquette, tomate, cornichon, sauce paprika'},
  {image: 'https://lacapsule.academy/wks2/burger_2.png', price: '12€', name: 'Le Amberger', desc:'Burger de boeuf limousin, oignons confits, salade, tomate, fourme d’Ambert et noix'},
  {image: 'https://lacapsule.academy/wks2/burger_3.png', price: '11€', name: 'Le Poulet', desc:'Burger de poulet, cheddar, avocat, tomate, oignons, sauce au citron vert'},
 
];

var titleApp = 'Choisissez nos burgers';

ReactDOM.render(
  <App products={PRODUCTS} title={titleApp} />,
  document.getElementById('container')
);