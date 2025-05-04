import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PurchaseButton({ courseId }) {
    const [purchaseStatus, setPurchaseStatus] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handlePurchase = () => {
        if (!token) {
            // Redirect to login if not authenticated
            navigate('/users/login');
            return;
        }

        // Show purchase in progress
        setPurchaseStatus('processing');

        // Send purchase request
        fetch(`http://localhost:3000/users/courses/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Course purchased successfully!') {
                setPurchaseStatus('success');
                // Redirect to purchased courses after a delay
                setTimeout(() => {
                    navigate('/users/purchasedCourses');
                }, 2000);
            } else {
                setPurchaseStatus(null);
                alert(data.message || 'Purchase failed');
            }
        })
        .catch(err => {
            console.error('Purchase error:', err);
            setPurchaseStatus(null);
            alert('An error occurred during purchase. Please try again.');
        });
    };
    
    if (purchaseStatus === 'success') {
        return (
            <div className="purchase-success">
                Course purchased successfully! Redirecting to your courses...
            </div>
        );
    }

    return (
        <button 
            className="purchase-button" 
            onClick={handlePurchase}
            disabled={purchaseStatus === 'processing'}
        >
            {purchaseStatus === 'processing' ? 'Processing...' : 'Purchase Course'}
        </button>
    );
}

export default PurchaseButton;