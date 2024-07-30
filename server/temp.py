# Enter your code here
import numpy as np

# Function to solve Ax + By = C
def solve_linear_equation(a, b, c):
    A = np.array([[a, b]])
    B = np.array([c])
    solution = np.linalg.lstsq(A, B, rcond=None)[0]
    return solution

# 1. Solve 3x + 5y = 1
solution1 = solve_linear_equation(3, 5, 1)
print("Solution for 3x + 5y = 1:")
print("x =", solution1[0])
print("y =", solution1[1] if len(solution1) > 1 else "Any value")

# 2. Solve 19x + 27w = 1
solution2 = solve_linear_equation(19, 27, 1)
print("Solution for 19x + 27w = 1:")
print("x =", solution2[0])
print("w =", solution2[1] if len(solution2) > 1 else "Any value")

# 3. Solve 7m + 11n = 1
solution3 = solve_linear_equation(7, 11, 1)
print("Solution for 7m + 11n = 1:")
print("m =", solution3[0])
print("n =", solution3[1] if len(solution3) > 1 else "Any value")