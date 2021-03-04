import React, { useEffect, useState } from 'react'
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import './planScreen.styles.css';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

import UseSpinner from '../hooks/useSpinner';

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    const [loader, showLoader, hideLoader] = UseSpinner();


    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscription')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    });
                });
            });
    }, [user.uid]);

    useEffect(() => {
        db.collection('products').where('active', '==', true)
            .get().then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection
                        ('prices').get();
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });
                setProducts(products);
            });
    }, []);

    const loadCheckout = async (priceId) => {
        showLoader();
        const docRef = await db.
            collection('customers').
            doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,

            });





        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occured: ${error.message}`);
            }
            if (sessionId) {
                const stripe = await loadStripe(
                    'pk_test_51IGQb2K7GCctk3fNPHO0ELt9h5dIJBeYCYtNT5PNxAgbJdGNayi0YBKYGDJ3Evva6aOBJFxAvGP45hOXodHd3qQr00fE3YYlHq'
                );
                stripe.redirectToCheckout({ sessionId });
            }
        })


        hideLoader();

    };

    return (
        <>
            <div className='planScreen'>
                {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000)}</p>}

                {Object.entries(products).map(([productId, productData]) => {
                    //user subscription
                    const isCurrentPackage = productData.name
                        ?.toLowerCase()
                        .includes(subscription?.role);


                    return (
                        <div key={productId} className={`${isCurrentPackage && 'planScreen_plan-disabled'} planScreen_plan`}>
                            <div className='planScreen_info'>
                                <h5>{productData.name}</h5>
                                <h5>{productData.description}</h5>
                            </div>
                            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)
                            }
                            >
                                {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                            </button>
                        </div>
                        
                    )
                })}


            </div>
            {loader}
            

        </>
        

    )


}

export default PlanScreen;
