# Release checks

The existing Postman collection in postman/collection.json holds the team's functional API checks. It is run manually today and is not wired into CI.

The next release also needs a repeatable performance check: ramp to about 50 concurrent users over two minutes, measure p90/p95 latency and error rate, and fail CI if p90 exceeds 500 ms. Exercise representative reads without creating unbounded data. GitHub Actions is our CI system.
