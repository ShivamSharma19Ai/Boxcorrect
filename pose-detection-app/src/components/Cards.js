import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Get an Insight into the Tips</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/image-1.jpg'
              text='Keep your right hand up while jabbing is important since if we do not do so we might get hit like the way we can see in the image it is important to be defensively responsible while throwing shots in order to gain momentum as the game about hit and not get hit'
              label='Keep your right hand up while jabbing'
              path='/services'
            />
            <CardItem
              src='images/image-2.jpg'
              text='Siting on your punches is very important since it puts power in the punches what it means is to bend your knees as this helps to get rotation into the punches'
              label='Sit on your punches'
              path='/services'
            />
           </ul>
           <ul className='cards__items'>
            <CardItem
              src='images/image-3.webp'
              text='Feet are the most important in boxing because they provide stability if you have youe feet at the right distance you will have power in your punches and it will be difficult for your opponent to knock you down. Hence it is important that we always mantain shoulder distance between our feet'
              label='Keep your Feet Shoulder Width Apart'
              path='/services'
            />
            <CardItem
              src='images/image-4.jpg'
              text='While punching if you lean it disturbs your balance that means that even a punch with less power will be able to knock you down'
              label='Do Not Lean on Punches'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
