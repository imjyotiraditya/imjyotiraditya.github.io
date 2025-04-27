---
layout: post
title: "AOSP Architecture, Build System & Boot Process: Technical Notes"
date: 2025-04-28
tags: [AOSP, Android, Build System, Android Architecture, Boot Process]
excerpt: Comprehensive technical notes on Android Open Source Project architecture, build system evolution, and boot process with detailed visualizations using ASCII art.
---

## Android Architecture: The Complete Stack

Let's examine each layer of Android's architecture in detail:

```
┌────────────────────────────────────────────────────┐
│               Application Layer                    │
│    ┌────────────────┐    ┌───────────────────┐     │
│    │  System Apps   │    │  Third-party Apps │     │
│    └────────────────┘    └───────────────────┘     │
├────────────────────────────────────────────────────┤
│         Application Framework Layer                │
│  ┌──────────────────────────────────────────────┐  │
│  │ Activity   Package   Window    Telephony     │  │
│  │ Manager    Manager   Manager   Manager       │  │
│  │                                              │  │
│  │ Location   Resource  Content   View          │  │
│  │ Manager    Manager   Providers System        │  │
│  └──────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────┤
│       Libraries & Android Runtime Layer            │
│  ┌────────────────────┐   ┌─────────────────────┐  │
│  │   C/C++ Libraries  │   │   Android Runtime   │  │
│  │                    │   │                     │  │
│  │ • WebKit           │   │ • ART (AOT)         │  │
│  │ • OpenMAX AL       │   │ • Core Libraries    │  │
│  │ • libc             │   │ • JIT Compiler      │  │
│  │ • OpenGL|ES        │   │ • Memory Mgmt       │  │
│  │ • Media Framework  │   │                     │  │
│  │ • SQLite           │   │                     │  │
│  │ • SSL              │   │                     │  │
│  └────────────────────┘   └─────────────────────┘  │
├────────────────────────────────────────────────────┤
│        Hardware Abstraction Layer (HAL)            │
│  ┌──────────────────────────────────────────────┐  │
│  │ Audio HAL | Camera HAL | Sensors HAL | etc.  │  │
│  └──────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────┤
│               Linux Kernel                         │
│  ┌──────────────────────────────────────────────┐  │
│  │ Drivers | Memory Mgmt | Process Mgmt | I/O   │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

## The AOSP Build System: Evolution from Make to Soong

Android's build system has evolved to handle the complexity of building the entire Android system:

```
                    Build System Evolution
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Android.mk  │    │    Make     │    │    Kati     │    │    Ninja    │
│  (Legacy)   │──► │ (GNU Make)  │──► │ (Makefile   │──► │ (Build Tool)│
└─────────────┘    └─────────────┘    │   Parser)   │    └─────────────┘
                                      └─────────────┘           │
                                                                ▼
                                                         ┌─────────────┐
                                                         │   Output    │
                                                         │   (.img)    │
                                                         └─────────────┘

                    Modern Soong System
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Blueprint  │    │    Soong     │    │    Ninja    │
│ (.bp files) │──► │ (Go program) │──► │ Build Files │
└─────────────┘    └──────────────┘    └─────────────┘
```

The build process:

1. **Make**: Traditional GNU Make starts the process
2. **Kati**: Google's Make clone that parses Android.mk faster than GNU Make
3. **Soong**: Modern build system written in Go that uses Blueprint files
4. **Ninja**: Low-level build system that executes the actual build commands

### Advanced Build Commands

The build system provides numerous commands beyond the basics:

#### Environment Setup Commands

```bash
# Initialize environment
source build/envsetup.sh

# View all available commands
hmm

# Select build target
lunch aosp_arm64-eng
```

#### Module Building Commands

```bash
# Build entire system
m

# Build specific module and dependencies
mma

# Build all modules in current directory
mm

# Build all modules in current directory with dependencies
mma

# Build specific modules
mmm packages/apps/Settings packages/apps/Launcher3

# Build specific modules with dependencies
mmma packages/apps/Settings frameworks/base

# Incremental builds
m -j8  # Use 8 threads
m -k   # Keep going when some targets fail
```

#### Advanced Search and Navigation

```bash
# Search commands
cgrep "pattern"    # Search in C/C++ files
jgrep "pattern"    # Search in Java files
resgrep "pattern"  # Search in resource XML files
mangrep "pattern"  # Search in AndroidManifest.xml files
sepgrep "pattern"  # Search in SEPolicy files
sgrep "pattern"    # Search in all source files

# Module navigation
godir filename     # Go to directory containing a file
gomod module_name  # Go to module directory
pathmod module_name # Print module path
refreshmod         # Refresh module database
allmod             # List all modules
```

#### Build System Analysis

```bash
# Analyze build performance
m showcommands     # Show actual commands executed
m dist            # Create distribution package
m checkbuild      # Run build system checks
m modules         # List all defined modules

# Clean builds
m clean-<module>  # Clean specific module
m installclean    # Clean installed files
m clobber         # Complete clean (removes out/)
```

## AOSP Source Code Deep Dive

The source tree structure and its components:

```
AOSP Root
│
├── art/              ── Android Runtime (ART)
│   ├── compiler/     ── AOT/JIT compilers
│   ├── runtime/      ── Runtime components
│   └── dex2oat/      ── DEX to OAT converter
│
├── bionic/           ── Android's C library
│   ├── libc/         ── Core C library
│   ├── libm/         ── Math library
│   └── linker/       ── Dynamic linker
│
├── frameworks/       ── Core system services
│   ├── base/         ── Framework APIs
│   │   ├── core/java/android/
│   │   ├── services/core/
│   │   └── native/
│   └── av/           ── Audio/Video framework
│
├── system/           ── Core OS components
│   ├── core/         ── Init, logd, etc.
│   ├── sepolicy/     ── SELinux policies
│   └── vold/         ── Volume daemon
│
└── hardware/         ── HAL implementations
    ├── interfaces/   ── HAL interfaces (HIDL)
    └── libhardware/  ── Legacy HAL
```

## Android Boot Process

The Android boot process is a complex sequence that transforms hardware from power-on to a fully functional Android device:

```
[Power On] ──► [Bootloader] ──► [Kernel] ──► [Init] ──► [Zygote] ──► [System Server] ──► [System UI]
    │               │              │           │          │               │               │
    │               │              │           │          │               │               │
 Hardware       Load Kernel     Hardware      Mount FS   Create        Start          UI Components
 Init           Check           Init &        SELinux    Android       System         Status Bar
 PMU            Hardware        Drivers       Policies   Runtime       Services       Navigation
                Load                                     (ART)         (AMS,PMS)      Launcher
                Recovery
```

### Detailed Boot Process Steps

1. **Power On**: Power Management Unit (PMU) initializes hardware components

2. **Bootloader**:

   - Performs basic hardware checks
   - Loads kernel into memory
   - Provides recovery/fastboot modes

3. **Kernel**:

   - Initializes device drivers
   - Sets up memory management
   - Starts core subsystems

4. **Init Process**:

   - Mounts filesystems
   - Sets up SELinux policies
   - Starts Property Service
   - Parses init.rc files

5. **Zygote**:

   - Creates Android Runtime (ART)
   - Preloads common classes/resources
   - Waits for app launch requests

6. **System Server**:

   - Starts core system services:
     - ActivityManagerService
     - PackageManagerService
     - WindowManagerService
     - PowerManagerService
     - And many more...

7. **System UI**:
   - Initializes user interface components
   - Launches home screen/launcher

### System Server Services Startup

The System Server starts services in three categories:

```
startBootstrapServices()    startCoreServices()         startOtherServices()
         │                        │                           │
         ▼                        ▼                           ▼
  - Installer              - BatteryService          - CameraService
  - ActivityManager        - UsageStatsService       - AlarmManager
  - PowerManager           - WebViewUpdateService    - InputManager
  - DisplayManager         - GpuService              - WindowManager
  - PackageManager                                   - BluetoothService
  - SensorService                                    - AudioService
                                                     - NotificationManager
```

## Advanced Build Configuration

### Product Configuration

```makefile
# device/<vendor>/<device>/device.mk
PRODUCT_NAME := aosp_device
PRODUCT_DEVICE := device
PRODUCT_BRAND := vendor
PRODUCT_MODEL := Device Name
PRODUCT_MANUFACTURER := Vendor

# Include device-specific configurations
$(call inherit-product, device/vendor/device/device-common.mk)

# Device-specific overlays
DEVICE_PACKAGE_OVERLAYS += device/vendor/device/overlay
```

### Board Configuration

```makefile
# device/<vendor>/<device>/BoardConfig.mk
TARGET_ARCH := arm64
TARGET_CPU_ABI := arm64-v8a
TARGET_CPU_VARIANT := cortex-a53

# Kernel configuration
TARGET_KERNEL_SOURCE := kernel/vendor/device
TARGET_KERNEL_CONFIG := device_defconfig

# Partitions
BOARD_BOOTIMAGE_PARTITION_SIZE := 67108864
BOARD_SYSTEMIMAGE_PARTITION_SIZE := 3221225472
```

## Runtime Resource Overlays (RRO)

Advanced RRO implementation:

```
Base Resource Tree         Overlay Configuration         Final Runtime View
       │                             │                            │
┌────────────────┐          ┌─────────────────┐          ┌────────────────┐
│ res/           │          │ overlay/        │          │ Merged View    │
│ ├── values/    │    +     │ └── res/        │    =     │ ├── values/    │
│ ├── layout/    │          │     └── values/ │          │ ├── layout/    │
│ └── drawable/  │          │         └── ..  │          │ └── drawable/  │
└────────────────┘          └─────────────────┘          └────────────────┘
```

## Build System Performance Optimization

Tips for faster builds:

1. **Use ccache for C/C++ compilation**

```bash
export USE_CCACHE=1
export CCACHE_DIR=/path/to/ccache
prebuilts/misc/linux-x86/ccache/ccache -M 50G
```

2. **Leverage incremental builds**

```bash
# Only rebuild changed modules
m installclean && m
```

3. **Parallel builds**

```bash
# Use all available cores
m -j$(nproc)
```

4. **Build specific modules**

```bash
# Build only what you need
mmm frameworks/base/services
```

## Advanced Development Workflow

A typical AOSP development workflow:

```
[Code Change] ──► [Build Module] ──► [Test] ──► [Debug] ──► [Submit]
      │                 │               │          │            │
  git status         mm/mma         atest       logcat      repo upload
  git add           make test       CTS/VTS    debuggerd    gerrit review
  git commit                                   systrace
```
