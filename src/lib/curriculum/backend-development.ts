/**
 * Backend Development — Professional Diploma
 * 12-week Python-based backend engineering curriculum (FastAPI primary, Django secondary).
 * Auto-generated exhaustive curriculum data.
 */
import type { CourseCurriculum } from "./types";
import img from "@/assets/curriculum/backend.jpg";

export const backendDevelopment: CourseCurriculum = {
  slug: "backend-development",
  title: "Backend Development",
  tagline: "Professional Diploma",
  duration: "3 Months (12 Weeks)",
  months: 3,
  totalWeeks: 12,
  level: "Beginner to Industry Ready",
  projectsCount: "15+",
  capstone: "1 Production-Grade API Platform",
  goal: "To transform beginners into industry-ready backend engineers who can design, build, secure, test, and deploy production-grade APIs and services using modern Python, FastAPI, PostgreSQL, and cloud-native tooling.",
  overview: "This 12-week Python-based Backend Development Diploma takes learners from core Python fundamentals through advanced object-oriented and asynchronous programming, into building real-world REST APIs with FastAPI and Pydantic. Learners master relational data modeling with PostgreSQL and SQLAlchemy/Alembic, expand into Redis caching and MongoDB, implement production-grade authentication and OWASP-aware security, process background jobs with Celery, build real-time features with WebSockets, and containerize and deploy applications using Docker and CI/CD pipelines. The program closes with system design, observability, a secondary Django/DRF module, and a capstone in which learners architect, build, secure, test, and deploy a complete production-grade API platform.",
  image: img,
  weeks: [
  {
    number: 1,
    title: "Python Language Foundations",
    overview: "Establish rock-solid Python 3.12+ fundamentals used across every backend system you will ever build.",
    objectives: [
      "Set up a professional Python development environment with virtual environments and tooling",
      "Master Python's core syntax, data types, and control flow",
      "Write clean, idiomatic Python using PEP 8 conventions",
      "Understand Python's memory model and variable scoping"
    ],
    sections: [
      { id: "1.1", title: "Environment & Tooling", topics: [
        "Installing Python 3.12+",
        "pyenv for version management",
        "venv vs virtualenv vs poetry",
        "pip and requirements.txt",
        "pyproject.toml structure",
        "VS Code / PyCharm setup",
        "ruff and black formatters",
        "mypy static typing intro",
        "REPL and IPython",
        "Jupyter for exploration",
        "Git basics for Python projects",
        ".gitignore for Python"
      ] },
      { id: "1.2", title: "Core Syntax & Data Types", topics: [
        "Variables and dynamic typing",
        "int, float, complex, bool",
        "Strings and f-strings",
        "String methods and slicing",
        "Numeric operators and precedence",
        "Type casting",
        "None and NoneType",
        "Truthy/falsy values",
        "Multiple assignment and unpacking",
        "Walrus operator :=",
        "Comments and docstrings",
        "Input/output basics"
      ] },
      { id: "1.3", title: "Collections", topics: [
        "Lists and list methods",
        "Tuples and immutability",
        "Sets and set operations",
        "Dictionaries and dict methods",
        "Nested data structures",
        "List/dict/set comprehensions",
        "Generator expressions",
        "zip(), enumerate(), map(), filter()",
        "Sorting with key functions",
        "Slicing advanced patterns",
        "Copy vs deepcopy",
        "Named tuples"
      ] },
      { id: "1.4", title: "Control Flow & Functions", topics: [
        "if/elif/else",
        "for and while loops",
        "break, continue, else on loops",
        "match-case statements",
        "Function definitions and return values",
        "Default and keyword arguments",
        "*args and **kwargs",
        "Lambda functions",
        "Scope: local, enclosing, global",
        "Recursion basics",
        "Type hints for functions",
        "Docstring conventions (Google/NumPy style)"
      ] },
      { id: "1.5", title: "Error Handling & Files", topics: [
        "try/except/else/finally",
        "Custom exceptions",
        "Exception chaining",
        "Context managers with 'with'",
        "Reading/writing files",
        "Working with JSON",
        "Working with CSV",
        "pathlib for file paths",
        "Logging module basics",
        "assert statements",
        "Debugging with pdb",
        "Environment variables with os and dotenv"
      ] }
    ],
    exercises: [
      "Build a CLI calculator with error handling",
      "Write comprehension-based data transformers",
      "Implement a text file word-frequency counter",
      "Create custom exception hierarchy for a mini app",
      "Practice unpacking and *args/**kwargs patterns"
    ],
    assignments: [
      "Build a command-line contact book with file persistence",
      "Write a script that parses and summarizes a CSV dataset"
    ],
    projects: [
      "CLI Personal Finance Tracker (file-based storage)"
    ],
    outcomes: [
      "Comfortable writing idiomatic Python scripts",
      "Can debug and handle errors gracefully",
      "Understands Python data structures deeply",
      "Able to read/write files and JSON/CSV confidently"
    ],
    assessment: "Timed coding test covering syntax, data structures, functions, and error handling.",
  },
  {
    number: 2,
    title: "Object-Oriented & Advanced Python",
    overview: "Deepen Python mastery with OOP design, functional patterns, and advanced language features used in production codebases.",
    objectives: [
      "Design classes using OOP principles",
      "Apply advanced Python features: decorators, generators, context managers",
      "Understand Python's typing system for large codebases",
      "Structure multi-module Python packages"
    ],
    sections: [
      { id: "2.1", title: "Classes & Objects", topics: [
        "class syntax and __init__",
        "Instance vs class attributes",
        "Instance methods, class methods, static methods",
        "self and cls conventions",
        "Encapsulation and property decorators",
        "__str__ and __repr__",
        "Operator overloading (__eq__, __add__)",
        "Composition vs inheritance",
        "Multiple inheritance and MRO",
        "super() usage",
        "Abstract base classes (ABC)",
        "dataclasses for boilerplate reduction"
      ] },
      { id: "2.2", title: "Advanced OOP Patterns", topics: [
        "Interfaces via Protocols",
        "Mixins",
        "Class decorators",
        "Metaclasses (intro)",
        "Enum classes",
        "Singleton pattern",
        "Factory pattern",
        "Repository pattern basics",
        "SOLID principles in Python",
        "Design patterns overview",
        "Immutable objects (frozen dataclasses)",
        "Slots for memory optimization (__slots__)"
      ] },
      { id: "2.3", title: "Functional & Iterators", topics: [
        "Iterators and __iter__/__next__",
        "Generators and yield",
        "yield from and generator delegation",
        "itertools module (chain, groupby, product)",
        "functools (reduce, partial, lru_cache)",
        "Decorators with arguments",
        "Chaining multiple decorators",
        "First-class functions",
        "Closures",
        "Higher-order functions",
        "Memoization patterns",
        "Context managers with contextlib"
      ] },
      { id: "2.4", title: "Typing & Modules", topics: [
        "typing module: List, Dict, Optional, Union",
        "Generics with TypeVar",
        "Protocol typing",
        "TypedDict",
        "Literal types",
        "Structuring packages (__init__.py)",
        "Relative vs absolute imports",
        "Module vs package",
        "Namespace packages",
        "Circular import resolution",
        "Publishing internal packages",
        "mypy strict mode configuration"
      ] },
      { id: "2.5", title: "Testing Fundamentals", topics: [
        "pytest basics and test discovery",
        "Assertions and fixtures",
        "Parametrized tests",
        "Mocking with unittest.mock",
        "Test coverage with coverage.py",
        "conftest.py patterns",
        "Testing exceptions",
        "Setup/teardown patterns",
        "Test organization strategy",
        "TDD workflow intro"
      ] }
    ],
    exercises: [
      "Refactor Week 1 CLI app into OOP classes",
      "Build a generator-based data pipeline",
      "Write decorators for logging and timing functions",
      "Implement a custom context manager",
      "Write pytest suite for a small library"
    ],
    assignments: [
      "Design a class hierarchy for an e-commerce inventory system",
      "Build a typed, tested utility library published as an internal package"
    ],
    projects: [
      "Library Management System (OOP, file-based, fully tested)"
    ],
    outcomes: [
      "Can design clean OOP class hierarchies",
      "Comfortable with decorators, generators, and context managers",
      "Writes typed, testable Python code",
      "Understands package structuring best practices"
    ],
    assessment: "Code review assignment: refactor a procedural script into well-tested OOP code.",
  },
  {
    number: 3,
    title: "Async Python & Web Fundamentals",
    overview: "Understand how the web works and master Python's async model, the backbone of modern high-performance APIs.",
    objectives: [
      "Understand HTTP, REST principles, and client-server architecture",
      "Master Python's asyncio event loop and coroutines",
      "Differentiate concurrency models: threading, multiprocessing, asyncio",
      "Build simple async network clients"
    ],
    sections: [
      { id: "3.1", title: "Web & HTTP Fundamentals", topics: [
        "HTTP request/response cycle",
        "HTTP methods (GET/POST/PUT/PATCH/DELETE)",
        "Status codes and their meaning",
        "Headers, cookies, sessions",
        "URL structure and query params",
        "REST architectural principles",
        "Richardson maturity model",
        "JSON as data interchange",
        "Content negotiation",
        "CORS explained",
        "API versioning strategies",
        "Idempotency concepts"
      ] },
      { id: "3.2", title: "Asyncio Core", topics: [
        "Event loop concept",
        "async def and coroutines",
        "await keyword",
        "asyncio.run, create_task, gather",
        "Tasks vs coroutines",
        "Cancellation and timeouts",
        "asyncio.sleep vs time.sleep",
        "Async context managers (async with)",
        "Async iterators (async for)",
        "asyncio.Queue",
        "Exception handling in async code",
        "Debugging asyncio apps"
      ] },
      { id: "3.3", title: "Concurrency Models", topics: [
        "GIL explained",
        "Threading module and Lock",
        "Multiprocessing module",
        "ThreadPoolExecutor / ProcessPoolExecutor",
        "When to use async vs threads vs processes",
        "concurrent.futures",
        "CPU-bound vs I/O-bound workloads",
        "Async HTTP clients (httpx)",
        "Async file I/O (aiofiles)",
        "Race conditions and synchronization",
        "Deadlock avoidance",
        "Performance benchmarking"
      ] },
      { id: "3.4", title: "Networking Basics", topics: [
        "sockets module intro",
        "Building a simple TCP echo server",
        "Building a simple HTTP server from scratch",
        "WSGI vs ASGI explained",
        "uvicorn as ASGI server",
        "Request lifecycle in ASGI apps",
        "DNS and networking basics for backend devs",
        "Load balancers conceptually",
        "Reverse proxies (nginx intro)",
        "Environment configuration patterns"
      ] }
    ],
    exercises: [
      "Build an async web scraper with httpx and asyncio.gather",
      "Compare threaded vs async fetch performance",
      "Build a raw TCP chat server with sockets",
      "Implement rate-limited async task queue",
      "Benchmark CPU-bound task across threading/multiprocessing"
    ],
    assignments: [
      "Build an async multi-URL health checker CLI tool",
      "Write a report comparing concurrency models with benchmarks"
    ],
    projects: [
      "Async Web Scraper & Aggregator Tool"
    ],
    outcomes: [
      "Understands HTTP/REST deeply",
      "Comfortable writing asyncio-based programs",
      "Knows when to choose threads, processes, or async",
      "Understands ASGI fundamentals before learning FastAPI"
    ],
    assessment: "Practical exam: build and benchmark an async data-fetching tool.",
  },
  {
    number: 4,
    title: "FastAPI Fundamentals",
    overview: "Start building real APIs with FastAPI, the industry-standard modern Python web framework.",
    objectives: [
      "Build RESTful APIs using FastAPI",
      "Validate data using Pydantic v2 models",
      "Understand dependency injection in FastAPI",
      "Generate and use interactive API documentation"
    ],
    sections: [
      { id: "4.1", title: "FastAPI Basics", topics: [
        "Project setup and structure",
        "Installing fastapi and uvicorn",
        "Path operations (@app.get, @app.post etc)",
        "Path parameters and type conversion",
        "Query parameters and defaults",
        "Request body parsing",
        "Response models",
        "Status codes with responses",
        "Automatic OpenAPI/Swagger docs",
        "ReDoc documentation",
        "Uvicorn reload and workers",
        "Application factory pattern"
      ] },
      { id: "4.2", title: "Pydantic v2 Models", topics: [
        "BaseModel basics",
        "Field validation and constraints",
        "Field() with defaults and metadata",
        "Custom validators (@field_validator)",
        "Model validators (@model_validator)",
        "Nested models",
        "Optional and Union fields",
        "Enum fields",
        "computed_field",
        "model_config settings",
        "Serialization (model_dump, model_dump_json)",
        "Pydantic Settings for config management"
      ] },
      { id: "4.3", title: "Routing & Structure", topics: [
        "APIRouter for modular routes",
        "Route prefixes and tags",
        "Path operation configuration",
        "Request/response schema separation (DTOs)",
        "Organizing routers/services/schemas folders",
        "Versioned API structure (/api/v1)",
        "Static files serving",
        "Templating with Jinja2 (brief)",
        "Background tasks (BackgroundTasks)",
        "Exception handlers (custom)",
        "HTTPException usage",
        "Global exception handling"
      ] },
      { id: "4.4", title: "Dependency Injection", topics: [
        "Depends() basics",
        "Function-based dependencies",
        "Class-based dependencies",
        "Sub-dependencies",
        "Dependency caching",
        "Dependencies for shared logic (pagination, filters)",
        "Dependency overrides for testing",
        "Path/query dependency reuse",
        "Yield dependencies for cleanup",
        "Global dependencies",
        "Security dependency pattern intro"
      ] },
      { id: "4.5", title: "Middleware & CORS", topics: [
        "Custom middleware",
        "CORSMiddleware configuration",
        "GZip middleware",
        "Request/response logging middleware",
        "Rate limiting middleware concept",
        "Trusted host middleware",
        "Startup/shutdown events (lifespan)",
        "Environment-based configuration",
        "Health check endpoints"
      ] }
    ],
    exercises: [
      "Build CRUD endpoints for a Todo API",
      "Add validation with custom Pydantic validators",
      "Implement pagination dependency",
      "Write global exception handlers",
      "Add request logging middleware"
    ],
    assignments: [
      "Build a Book Catalog API with full CRUD and validation",
      "Refactor endpoints into routers/services/schemas structure"
    ],
    projects: [
      "Task Management REST API (in-memory storage, fully documented)"
    ],
    outcomes: [
      "Can scaffold and structure a FastAPI project professionally",
      "Comfortable with Pydantic validation",
      "Understands dependency injection deeply",
      "Can produce clean, documented REST APIs"
    ],
    assessment: "Build and document a complete CRUD API meeting a given spec.",
  },
  {
    number: 5,
    title: "SQL & PostgreSQL Mastery",
    overview: "Master relational databases and SQL, the foundation of persistent backend data.",
    objectives: [
      "Write complex SQL queries confidently",
      "Design normalized relational schemas",
      "Understand indexes and query performance",
      "Use PostgreSQL-specific features effectively"
    ],
    sections: [
      { id: "5.1", title: "SQL Fundamentals", topics: [
        "Installing PostgreSQL",
        "psql CLI basics",
        "CREATE TABLE and data types",
        "INSERT, SELECT, UPDATE, DELETE",
        "WHERE clauses and operators",
        "ORDER BY, LIMIT, OFFSET",
        "DISTINCT",
        "Aggregate functions (COUNT, SUM, AVG)",
        "GROUP BY and HAVING",
        "NULL handling",
        "Basic constraints (NOT NULL, UNIQUE, CHECK)",
        "Comments and formatting SQL"
      ] },
      { id: "5.2", title: "Relationships & Joins", topics: [
        "Primary keys and foreign keys",
        "One-to-many relationships",
        "Many-to-many with junction tables",
        "One-to-one relationships",
        "INNER JOIN",
        "LEFT/RIGHT/FULL OUTER JOIN",
        "CROSS JOIN",
        "Self joins",
        "Subqueries",
        "Common Table Expressions (WITH)",
        "UNION and UNION ALL",
        "Set operations (INTERSECT, EXCEPT)"
      ] },
      { id: "5.3", title: "Schema Design", topics: [
        "Normalization (1NF, 2NF, 3NF)",
        "Denormalization trade-offs",
        "ER diagrams",
        "Choosing data types wisely",
        "Indexes: B-tree, GIN, GiST",
        "Composite indexes",
        "Unique constraints and partial indexes",
        "Cascading deletes/updates",
        "Soft deletes pattern",
        "Audit columns (created_at/updated_at)",
        "UUID vs serial primary keys",
        "Schema versioning strategy"
      ] },
      { id: "5.4", title: "Advanced PostgreSQL", topics: [
        "JSONB columns and querying",
        "Full-text search basics",
        "Window functions (ROW_NUMBER, RANK)",
        "Transactions and ACID",
        "Isolation levels",
        "Explain and Explain Analyze",
        "Query optimization techniques",
        "Views and materialized views",
        "Stored procedures/functions (PL/pgSQL intro)",
        "Triggers",
        "Connection pooling concepts (pgbouncer)",
        "Backup and restore basics (pg_dump)"
      ] }
    ],
    exercises: [
      "Write complex multi-join reporting queries",
      "Design a normalized schema for a blog platform",
      "Practice window functions on sales data",
      "Optimize a slow query using EXPLAIN ANALYZE",
      "Write CTEs for hierarchical data"
    ],
    assignments: [
      "Design and implement a normalized e-commerce database schema",
      "Write a SQL performance report comparing indexed vs non-indexed queries"
    ],
    projects: [
      "E-Commerce Database Design with 10+ related tables and analytical queries"
    ],
    outcomes: [
      "Writes advanced SQL confidently",
      "Can design normalized, performant schemas",
      "Understands indexing and query optimization",
      "Comfortable with PostgreSQL-specific features"
    ],
    assessment: "SQL practical exam: schema design plus 10 query challenges.",
  },
  {
    number: 6,
    title: "SQLAlchemy ORM & Database Integration",
    overview: "Integrate PostgreSQL into FastAPI applications using SQLAlchemy 2.0 and manage schema migrations with Alembic.",
    objectives: [
      "Model relational data using SQLAlchemy 2.0 ORM",
      "Perform CRUD operations through the ORM efficiently",
      "Manage schema evolution using Alembic migrations",
      "Integrate async database sessions with FastAPI"
    ],
    sections: [
      { id: "6.1", title: "SQLAlchemy Core Concepts", topics: [
        "Engine and connection basics",
        "Declarative Base and Mapped classes",
        "Column types and mapping",
        "Table metadata",
        "Sessions and session lifecycle",
        "Sync vs async engine (asyncpg driver)",
        "Connection pooling configuration",
        "Raw SQL execution with text()",
        "Reflection of existing databases"
      ] },
      { id: "6.2", title: "ORM Modeling", topics: [
        "Defining models with Mapped[] and mapped_column",
        "Relationships: relationship()",
        "One-to-many mapping",
        "Many-to-many with association tables",
        "One-to-one mapping",
        "Backref vs back_populates",
        "Cascade options",
        "Lazy loading vs eager loading (joinedload, selectinload)",
        "Hybrid properties",
        "Model mixins for shared columns",
        "Enum columns",
        "Constraints in ORM models"
      ] },
      { id: "6.3", title: "CRUD & Queries", topics: [
        "select() statement construction (2.0 style)",
        "Filtering with where()",
        "Ordering and pagination in ORM",
        "join() in ORM queries",
        "Aggregate queries via ORM",
        "Bulk insert/update/delete",
        "Transactions and commit/rollback",
        "Async session usage (AsyncSession)",
        "Repository pattern with SQLAlchemy",
        "Unit of work pattern",
        "Query performance pitfalls (N+1 problem)",
        "Testing with a transactional rollback pattern"
      ] },
      { id: "6.4", title: "Alembic Migrations", topics: [
        "Installing and initializing Alembic",
        "alembic.ini configuration",
        "Autogenerate migrations",
        "Writing manual migration scripts",
        "Upgrade and downgrade commands",
        "Branching migrations",
        "Data migrations vs schema migrations",
        "Migration naming conventions",
        "Handling migration conflicts in teams",
        "Running migrations in CI/CD",
        "Seeding initial data"
      ] },
      { id: "6.5", title: "FastAPI + DB Integration", topics: [
        "Database session dependency",
        "get_db pattern with yield",
        "Async database dependency",
        "Environment-based DB URLs",
        "Connecting Pydantic schemas with ORM models",
        "from_attributes / orm_mode",
        "Layered architecture: router -> service -> repository -> model",
        "Error handling for DB constraint violations",
        "Testing endpoints with a test database"
      ] }
    ],
    exercises: [
      "Model a blog schema with SQLAlchemy relationships",
      "Write async CRUD repository functions",
      "Create and run Alembic migrations for schema changes",
      "Fix an N+1 query problem using eager loading",
      "Write integration tests against a test DB"
    ],
    assignments: [
      "Build a full async repository layer for a multi-table domain",
      "Convert the Task Management API to persist data in PostgreSQL"
    ],
    projects: [
      "Task Management API v2 (PostgreSQL-backed, migrated with Alembic)"
    ],
    outcomes: [
      "Can model complex relational data with SQLAlchemy 2.0",
      "Manages schema migrations confidently with Alembic",
      "Understands async DB session handling in FastAPI",
      "Follows layered architecture best practices"
    ],
    assessment: "Build a persisted, migrated, tested CRUD module end-to-end.",
  },
  {
    number: 7,
    title: "Authentication, Authorization & Security",
    overview: "Implement secure authentication and authorization systems, and understand core web security principles.",
    objectives: [
      "Implement JWT-based authentication in FastAPI",
      "Understand OAuth2 flows and third-party login",
      "Apply role-based and permission-based access control",
      "Recognize and mitigate common web vulnerabilities (OWASP Top 10)"
    ],
    sections: [
      { id: "7.1", title: "Password & Session Security", topics: [
        "Password hashing with bcrypt/argon2",
        "passlib / pwdlib usage",
        "Salting concepts",
        "Storing credentials securely",
        "Session-based vs token-based auth",
        "Secure cookie flags (HttpOnly, Secure, SameSite)",
        "CSRF protection basics",
        "Login/logout flow design",
        "Account lockout and rate limiting",
        "Email verification flow"
      ] },
      { id: "7.2", title: "JWT & OAuth2", topics: [
        "JWT structure (header/payload/signature)",
        "Access tokens vs refresh tokens",
        "Token expiration strategy",
        "OAuth2PasswordBearer in FastAPI",
        "OAuth2 password flow implementation",
        "Refresh token rotation",
        "Revocation/blacklisting strategies",
        "Third-party OAuth2 (Google/GitHub login)",
        "OpenID Connect basics",
        "Storing tokens client-side safely",
        "python-jose / pyjwt libraries"
      ] },
      { id: "7.3", title: "Authorization", topics: [
        "Role-based access control (RBAC)",
        "Permission-based access control",
        "Scopes in OAuth2",
        "Dependency-based authorization guards",
        "Resource ownership checks",
        "Admin vs user route protection",
        "Multi-tenant authorization concepts",
        "API key authentication for services",
        "Rate limiting per user/role"
      ] },
      { id: "7.4", title: "OWASP & Security Hardening", topics: [
        "OWASP Top 10 overview",
        "SQL injection prevention (parameterized queries)",
        "XSS prevention basics for APIs",
        "CSRF deep dive",
        "Mass assignment vulnerabilities",
        "Insecure direct object references (IDOR)",
        "Security headers (HSTS, CSP, X-Frame-Options)",
        "Secrets management (never commit secrets)",
        "Dependency vulnerability scanning",
        "Input sanitization and validation layers",
        "Logging sensitive data pitfalls",
        "Rate limiting and brute-force protection"
      ] }
    ],
    exercises: [
      "Implement JWT login/refresh flow from scratch",
      "Add RBAC to an existing API",
      "Implement Google OAuth2 login",
      "Write tests for auth edge cases (expired/invalid tokens)",
      "Audit an API for OWASP Top 10 issues"
    ],
    assignments: [
      "Build a complete auth module: register, login, refresh, logout, RBAC",
      "Write a security audit report on a provided sample API"
    ],
    projects: [
      "Secure Auth Service (JWT + OAuth2 + RBAC) reusable across projects"
    ],
    outcomes: [
      "Implements production-grade JWT/OAuth2 auth",
      "Applies RBAC and scopes correctly",
      "Understands and mitigates OWASP Top 10 risks",
      "Hardens APIs against common attacks"
    ],
    assessment: "Security-focused practical: implement auth and pass a vulnerability checklist review.",
  },
  {
    number: 8,
    title: "Testing, Redis Caching & NoSQL with MongoDB",
    overview: "Ensure code quality with rigorous testing, and expand data layer skills with caching and document databases.",
    objectives: [
      "Write comprehensive automated test suites with pytest",
      "Implement caching strategies using Redis",
      "Model and query data in MongoDB",
      "Decide when to use SQL vs NoSQL vs caching layers"
    ],
    sections: [
      { id: "8.1", title: "Testing FastAPI Apps", topics: [
        "TestClient / httpx AsyncClient",
        "Testing endpoints end-to-end",
        "Fixtures for test DB setup/teardown",
        "Factory pattern for test data (factory_boy)",
        "Mocking external services",
        "Dependency overrides for tests",
        "Testing auth-protected routes",
        "Parametrized endpoint tests",
        "Coverage reporting and thresholds",
        "Test pyramid: unit/integration/e2e",
        "Continuous testing workflow"
      ] },
      { id: "8.2", title: "Redis Fundamentals", topics: [
        "Installing and running Redis",
        "Redis data types: strings, hashes, lists, sets, sorted sets",
        "redis-py / redis.asyncio client",
        "Basic caching pattern (cache-aside)",
        "TTL and expiration strategies",
        "Cache invalidation strategies",
        "Rate limiting with Redis",
        "Session storage in Redis",
        "Pub/Sub messaging basics",
        "Redis as a message broker for Celery",
        "Distributed locks with Redis"
      ] },
      { id: "8.3", title: "MongoDB Fundamentals", topics: [
        "Document model concept",
        "Installing MongoDB / Atlas setup",
        "Collections and documents",
        "CRUD with pymongo/motor (async)",
        "Query operators ($gt, $in, $regex etc)",
        "Indexing in MongoDB",
        "Aggregation pipeline basics ($match, $group, $project)",
        "Embedding vs referencing documents",
        "Schema validation in MongoDB",
        "ODMs: Beanie / MongoEngine overview",
        "When to choose MongoDB over PostgreSQL"
      ] },
      { id: "8.4", title: "Polyglot Persistence Strategy", topics: [
        "SQL vs NoSQL trade-offs",
        "Caching layer placement in architecture",
        "CAP theorem basics",
        "Combining PostgreSQL + Redis + MongoDB in one system",
        "Data consistency considerations",
        "Read-heavy vs write-heavy optimization",
        "Denormalization for read performance",
        "Cache warming strategies"
      ] }
    ],
    exercises: [
      "Write full pytest coverage for auth service",
      "Implement Redis caching for a slow database query",
      "Build a MongoDB-backed analytics logging feature",
      "Implement Redis-based rate limiter middleware",
      "Write aggregation pipeline for reporting"
    ],
    assignments: [
      "Add a caching layer to the Task Management API with measured performance improvement",
      "Build a MongoDB-based activity log/audit trail service"
    ],
    projects: [
      "Analytics & Activity Log Service (MongoDB + Redis caching)"
    ],
    outcomes: [
      "Writes high-coverage automated test suites",
      "Implements effective caching strategies with Redis",
      "Comfortable modeling and querying MongoDB",
      "Can architect polyglot persistence solutions"
    ],
    assessment: "Deliver a tested feature with measurable caching performance gains.",
  },
  {
    number: 9,
    title: "Background Jobs, Task Queues & Real-Time Communication",
    overview: "Handle asynchronous workloads with Celery and build real-time features using WebSockets.",
    objectives: [
      "Implement asynchronous background task processing with Celery",
      "Schedule periodic tasks reliably",
      "Build real-time features using WebSockets in FastAPI",
      "Design event-driven backend components"
    ],
    sections: [
      { id: "9.1", title: "Celery Fundamentals", topics: [
        "Celery architecture (broker, worker, backend)",
        "Installing Celery with Redis/RabbitMQ broker",
        "Defining tasks with @app.task",
        "Calling tasks with .delay() and .apply_async()",
        "Task result backends",
        "Retries and error handling in tasks",
        "Task chaining and chords",
        "Task routing and queues",
        "Celery worker concurrency models",
        "Monitoring with Flower"
      ] },
      { id: "9.2", title: "Scheduling & Reliability", topics: [
        "Celery Beat for periodic tasks",
        "Cron-style scheduling",
        "Idempotent task design",
        "Task deduplication strategies",
        "Dead-letter handling for failed tasks",
        "Task timeouts",
        "Rate limiting tasks",
        "Graceful worker shutdown",
        "Scaling workers horizontally",
        "Task observability and logging"
      ] },
      { id: "9.3", title: "WebSockets in FastAPI", topics: [
        "WebSocket protocol basics",
        "@app.websocket route handler",
        "Accepting and closing connections",
        "Broadcasting to multiple clients",
        "Connection manager pattern",
        "Authentication for WebSocket connections",
        "Handling disconnects gracefully",
        "WebSocket vs Server-Sent Events (SSE)",
        "Scaling WebSockets across multiple instances (Redis pub/sub)",
        "Testing WebSocket endpoints"
      ] },
      { id: "9.4", title: "Event-Driven Patterns", topics: [
        "Producer/consumer pattern",
        "Message queues overview (RabbitMQ vs Redis vs Kafka intro)",
        "Event sourcing concept overview",
        "Webhooks: sending and receiving",
        "Retry with exponential backoff",
        "Outbox pattern for reliability",
        "Designing decoupled services",
        "Async email/notification sending patterns"
      ] }
    ],
    exercises: [
      "Build a Celery task to send emails asynchronously",
      "Schedule a periodic data cleanup task with Celery Beat",
      "Build a WebSocket-based live chat feature",
      "Implement webhook receiver with signature verification",
      "Add retry logic with exponential backoff to a task"
    ],
    assignments: [
      "Build an async notification system (email + in-app) using Celery",
      "Build a real-time order-status WebSocket feature for an e-commerce API"
    ],
    projects: [
      "Real-Time Notification & Chat Backend (Celery + WebSockets + Redis)"
    ],
    outcomes: [
      "Implements reliable background job processing with Celery",
      "Schedules and monitors periodic tasks",
      "Builds real-time WebSocket features confidently",
      "Understands event-driven backend architecture"
    ],
    assessment: "Deliver a working background-job and real-time feature with monitoring in place.",
  },
  {
    number: 10,
    title: "Docker, CI/CD & Cloud Deployment",
    overview: "Package, automate, and deploy Python backend applications like a professional engineering team.",
    objectives: [
      "Containerize FastAPI applications with Docker",
      "Orchestrate multi-service apps with Docker Compose",
      "Build CI/CD pipelines for automated testing and deployment",
      "Deploy applications to cloud infrastructure"
    ],
    sections: [
      { id: "10.1", title: "Docker Fundamentals", topics: [
        "Docker concepts: images, containers, layers",
        "Writing a Dockerfile for FastAPI",
        "Multi-stage builds for smaller images",
        ".dockerignore best practices",
        "Environment variables in containers",
        "Docker networking basics",
        "Volumes for persistent data",
        "Docker Compose for multi-service apps (app + db + redis)",
        "Health checks in Docker Compose",
        "Debugging containers (logs, exec)"
      ] },
      { id: "10.2", title: "CI/CD Pipelines", topics: [
        "CI/CD concepts overview",
        "GitHub Actions workflow syntax",
        "Running pytest in CI",
        "Linting/formatting checks in CI (ruff, black)",
        "Building and pushing Docker images in CI",
        "Automated database migration step in pipeline",
        "Environment secrets management in CI",
        "Branch protection and PR checks",
        "Semantic versioning and release tagging",
        "Deployment approval gates"
      ] },
      { id: "10.3", title: "Cloud Deployment", topics: [
        "Deployment targets overview (Render, Railway, AWS, GCP, Azure)",
        "Deploying with Docker to a VPS",
        "Reverse proxy setup with nginx",
        "Setting up gunicorn+uvicorn workers for production",
        "Environment configuration for production",
        "Managed PostgreSQL services",
        "Managed Redis services",
        "Domain and SSL setup (Let's Encrypt/Certbot)",
        "Zero-downtime deployment strategies",
        "Rollback strategies"
      ] },
      { id: "10.4", title: "Infrastructure Basics", topics: [
        "Introduction to AWS core services (EC2, RDS, S3, ECS)",
        "Containers on AWS ECS/Fargate overview",
        "Environment variable/secret management in cloud (AWS Secrets Manager)",
        "Basic Infrastructure as Code concept (Terraform overview)",
        "Load balancing basics in cloud",
        "Autoscaling concepts",
        "CDN basics for static assets",
        "Cost-awareness for cloud resources"
      ] }
    ],
    exercises: [
      "Dockerize the Task Management API with Compose (app+db+redis)",
      "Write a GitHub Actions pipeline running tests and lint",
      "Deploy a containerized API to a cloud VPS",
      "Configure nginx as reverse proxy with SSL",
      "Set up a rollback-capable deployment workflow"
    ],
    assignments: [
      "Fully containerize and deploy a multi-service backend application",
      "Write a CI/CD pipeline that tests, builds, and deploys on merge to main"
    ],
    projects: [
      "Production Deployment Pipeline for the Task Management Platform"
    ],
    outcomes: [
      "Containerizes multi-service backend apps confidently",
      "Builds functioning CI/CD pipelines",
      "Deploys and manages APIs on cloud infrastructure",
      "Understands production infrastructure basics"
    ],
    assessment: "Demonstrate a live deployed API reachable via CI/CD-triggered pipeline.",
  },
  {
    number: 11,
    title: "System Design, Observability & Django",
    overview: "Think like a backend architect: design scalable systems, add observability, and learn Django as a secondary framework for full-featured apps.",
    objectives: [
      "Apply system design principles to backend architecture",
      "Implement logging, monitoring, and tracing for production systems",
      "Understand Django's MTV architecture and ORM as an alternative to FastAPI",
      "Design scalable, fault-tolerant backend systems"
    ],
    sections: [
      { id: "11.1", title: "System Design Fundamentals", topics: [
        "Client-server and n-tier architecture",
        "Vertical vs horizontal scaling",
        "Load balancing strategies",
        "Caching layers in system design",
        "Database sharding and replication",
        "CAP theorem revisited",
        "Message queues in system design",
        "Rate limiting algorithms (token bucket, sliding window)",
        "API Gateway pattern",
        "Microservices vs monolith trade-offs",
        "Designing a URL shortener (case study)",
        "Designing a notification system (case study)"
      ] },
      { id: "11.2", title: "Observability", topics: [
        "Structured logging with structlog/loguru",
        "Log levels and log aggregation (ELK/Loki overview)",
        "Application metrics with Prometheus",
        "Grafana dashboards overview",
        "Distributed tracing with OpenTelemetry",
        "Health check and readiness/liveness probes",
        "Error tracking with Sentry",
        "Alerting basics",
        "Performance profiling (py-spy, cProfile)",
        "APM tools overview"
      ] },
      { id: "11.3", title: "Django Fundamentals", topics: [
        "Django project vs app structure",
        "Django MTV pattern (models/templates/views)",
        "Django ORM models and migrations",
        "Django admin panel",
        "Django URLs and views (function-based & class-based)",
        "Django REST Framework (DRF) serializers",
        "DRF viewsets and routers",
        "DRF authentication/permissions",
        "Django settings and environments",
        "When to choose Django over FastAPI"
      ] },
      { id: "11.4", title: "API Design Best Practices", topics: [
        "RESTful resource naming conventions",
        "HATEOAS overview",
        "API pagination strategies",
        "Filtering and sorting query patterns",
        "Error response standardization (RFC 7807)",
        "API versioning strategies revisited",
        "Rate limiting exposure to clients",
        "OpenAPI spec customization",
        "GraphQL overview and comparison to REST",
        "gRPC overview for internal services"
      ] }
    ],
    exercises: [
      "Design a scalable system architecture diagram for a ride-sharing app",
      "Add structured logging and Sentry integration to an API",
      "Build a small CRUD app in Django REST Framework",
      "Implement standardized error responses across an API",
      "Add Prometheus metrics endpoint to a FastAPI app"
    ],
    assignments: [
      "Write a system design document for a scalable social media backend",
      "Rebuild one module of the Task Management API using Django REST Framework"
    ],
    projects: [
      "System Design Case Study + Django REST Framework Mini-Service"
    ],
    outcomes: [
      "Can reason about and design scalable backend systems",
      "Implements observability tooling in production apps",
      "Understands Django/DRF as an alternative backend framework",
      "Applies API design best practices consistently"
    ],
    assessment: "Present a system design document and a working observability-instrumented service.",
  },
  {
    number: 12,
    title: "Capstone: Production-Grade API Platform",
    overview: "Integrate everything learned into one production-grade, deployed, tested, secure, and documented API platform.",
    objectives: [
      "Architect and build a full-featured production backend platform end-to-end",
      "Apply security, testing, caching, and background processing cohesively",
      "Deploy the platform with a full CI/CD pipeline and observability",
      "Present and defend architectural decisions like a professional engineer"
    ],
    sections: [
      { id: "12.1", title: "Planning & Architecture", topics: [
        "Requirements gathering and scoping",
        "Domain modeling and ER diagram design",
        "Choosing the tech stack and justifying decisions",
        "API contract design (OpenAPI-first)",
        "Defining service boundaries",
        "Project folder architecture (routers/services/repositories/schemas)",
        "Task breakdown and milestone planning",
        "Risk assessment for the build"
      ] },
      { id: "12.2", title: "Core Implementation", topics: [
        "Implementing authentication and RBAC",
        "Implementing core domain CRUD modules",
        "Integrating PostgreSQL via SQLAlchemy + Alembic",
        "Integrating Redis caching layer",
        "Integrating Celery background jobs",
        "Adding WebSocket real-time feature",
        "Implementing pagination, filtering, sorting",
        "Writing comprehensive Pydantic validation"
      ] },
      { id: "12.3", title: "Quality & Hardening", topics: [
        "Writing unit and integration test suites",
        "Achieving meaningful test coverage",
        "Running security review against OWASP Top 10",
        "Load testing with locust/k6",
        "Optimizing slow queries",
        "Adding structured logging and error tracking",
        "Writing OpenAPI documentation polish",
        "Handling edge cases and input validation gaps"
      ] },
      { id: "12.4", title: "Deployment & Delivery", topics: [
        "Dockerizing the full platform",
        "Setting up CI/CD pipeline (test, build, deploy)",
        "Deploying to a cloud environment",
        "Setting up monitoring dashboards",
        "Writing a professional README and architecture doc",
        "Preparing a live demo",
        "Preparing an architecture defense presentation",
        "Post-launch monitoring plan"
      ] }
    ],
    exercises: [
      "Conduct a peer code review of a classmate's capstone module",
      "Run a load test and optimize based on results",
      "Write an incident response runbook for the platform",
      "Perform a self-audit against the OWASP checklist"
    ],
    assignments: [
      "Submit complete, deployed capstone project with documentation",
      "Deliver a live architecture defense presentation to instructors/peers"
    ],
    projects: [
      "Capstone: Full Production-Grade API Platform (auth, caching, background jobs, real-time, deployed with CI/CD)"
    ],
    outcomes: [
      "Delivers a fully functional, deployed, production-grade backend platform",
      "Demonstrates mastery of the complete backend engineering lifecycle",
      "Can defend architectural and technical decisions confidently",
      "Is portfolio-ready and interview-ready for backend engineering roles"
    ],
    assessment: "Final capstone evaluation: live demo, code review, and architecture defense.",
  }
  ],
};
