# Enter your code here
def find_d(phi_n, e):
    d = 1
    while True:
        if (d * e) % phi_n == 1:
            return d
        d += 1

# Example usage
phi_n = 40  # For example, the value of (p-1)(q-1)
e = 7       # Encryption key
print("Value of d:", find_d(phi_n, e))