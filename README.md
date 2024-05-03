Trip Timeline to start with:

Payment confirmed -> 2. Truck assigned -> 3. Truck Arrived for pickup -> 4. In Transit -> 5. Delivered
Step 3: Document upload from Driver side

Timeline - Status

1 - Pending
2 - In progress
3 - In progress
4 - In Transit
5 - Completed

Trip created (status: 4 (pending)) -> [only in dashboard]
Payment complete (status_id: 4) -> [only in dashboard]
Random truck selected (status_id: 4) -> [only in dashboard]
Driver accept (status_id: 5 -Inprogress) -> [Pickup]
Driver pickup - doc uploaded (status_id: 6) [Intransit]
Delivered (status_id: 3)

Statuses for owner:
Active Trips -> [5,6,3]

Upload Documents:
Table: trip_dos
Document types: [invoice, eway_bill, pickup_image]

upload testing -
https://czeuhxbwlhmtszaczaoa.supabase.co/storage/v1/object/public/vehicle/rc-book/test.png?t=2024-05-03T07%3A37%3A51.498Z
