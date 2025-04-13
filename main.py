# main.py

import module1  # Importing module1

# Calling functions from module1
module1.f1()
module1.f2()
module1._f3()  # This is a "private" function by convention but can still be called

# Printing the value of variable 'a' from module1
print("value is", module1.a)

# Modifying the value of 'a' in module1
module1.a = module1.a + 2
print("value is", module1.a)